var express = require("express");
const router = express.Router();

//Importing Controller

var urlController = require('./../controllers/urlShorten');

router
    .route('/addUrl')
    .post(urlController.addurl);
router
    .route('/:code')
    .get(urlController.geturl);

module.exports = router;

