require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
    },
})
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;
const Publication = require('./model/Publication')
const jwt = require('jsonwebtoken');

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/publications-not-protected', require('./routes/api/publications-not-protected'))
app.use('/editors', require('./routes/api/editors'))

app.use(verifyJWT);
app.use('/users', require('./routes/api/users'));
app.use('/publications-protected', require('./routes/api/publications-protected'))
app.use('/folder', require('./routes/api/folder'))

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// socket.io
io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
        });
    }
    // console.log(socket.decoded)
    next()
})
    .on("connection", socket => {

        socket.on('disconnect', () => {
        })

        socket.on("get-document", async ({ documentId }) => {
            let document = await Publication.findOne({ _id: documentId }).populate('owner editors', 'username').exec()
            // check to see if user exists as owner or editor
            const isOwner = document.owner.username == socket?.decoded?.UserInfo?.username ? true : false
            const isEditor = document.editors.some(editor => editor.username == socket?.decoded?.UserInfo?.username)
            const canEdit = isOwner || isEditor

            // clean up document
            document = { ...document._doc, editors: document.editors.map(editor => editor.username) }
            document = { ...document, editors: [...document.editors, document.owner.username] }
            document.owner = undefined

            socket.join(documentId)
            socket.emit("load-document", { document, canEdit })

            socket.on("send-changes", delta => {
                if (!documentId) return;
                socket.broadcast.to(documentId).emit("receive-changes", delta)
            })

            socket.on("save-document", async data => {
                if (!documentId) return;
                await Publication.findByIdAndUpdate(documentId, { content: data })
            })
        })
    })