const express = require('express');
const router = express.Router();
const publicationsController = require('../../controllers/publicationsController');

router.route('/')
    .put(publicationsController.getPublication)

module.exports = router;