const express = require('express');
const router = express.Router();
const folderController = require('../../controllers/folderController');

router.route('/')
    .get(folderController.getAllDocuments)

module.exports = router;