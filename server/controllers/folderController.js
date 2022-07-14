const User = require('../model/User');
const Publication = require('../model/Publication')

const getAllDocuments = async (req, res) => {
    console.log('Get all documents')
    const user = req?.user

    const foundUser = await User.findOne({ username: user }).exec()

    if (!foundUser) return res.status(204).json({ 'message': 'Could not find user' })

    const Publications = await Publication.find({
        $or: [
            { owner: foundUser },
            { editors: { $in: foundUser } }
        ]
    }, "title createdAt _id"
    ).populate('editors owner', 'username _id')

    res.status(200).json(Publications ? { ...Publications } : [])
}

module.exports = {
    getAllDocuments
}