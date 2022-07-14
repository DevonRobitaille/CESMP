const express = require('express');
const router = express.Router();
const publicationsController = require('../../controllers/publicationsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Editor), publicationsController.createPublication)

module.exports = router;