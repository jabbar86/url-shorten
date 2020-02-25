const moongose = require('mongoose');

const urlShortenModel = moongose.Schema({
    originalUrl: {
        type: String
    },
    urlCode: {
        type: String
    },
    shortUrl: {
        type: String
    },
    created_at: {
        type: Number
    },
    update_at: {
        type: Number
    }
})

const UrlShortenModel = moongose.model("urlshorten", urlShortenModel, "urlshorten");
module.exports = UrlShortenModel;