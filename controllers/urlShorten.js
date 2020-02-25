
const Joi = require('@hapi/joi');
const crypto = require('crypto');
const validUrl = require("valid-url");
const shortid = require('shortid');
const UrlShorten = require('./../models/urlShortenModel');
module.exports = {
    addurl: async (req, res, next) => {
        try {
            console.log("Request \n", req);

            let original_url = req.body.original_url;
            let base_url = req.body.base_url;

            var schema = Joi.object().keys({
                original_url: Joi.string().required(),
                base_url: Joi.string().required()
            });

            var result = schema.validate({
                original_url: original_url,
                base_url: base_url
                //fcmToken: fcmToken,
            });

            if (result && result.error) {
                console.log(result.error);
                let errorObj = {
                    status: 404,
                    data: null,
                    error: { message: result.error.details[0].message },
                    other_data: null,
                    message: result.error.details[0].message
                };

                return errorObj;
            }

            if (!validUrl.isUri(base_url)) {
                let errorObj = {
                    status: 401,
                    data: null,
                    error: { message: result.error.details[0].message },
                    other_data: null,
                    message: result.error.details[0].message
                };

                return errorObj;
            }

            const urlCode = shortid.generate();
            if (validUrl.isUri(original_url)) {

                //********* Check if the url already exist */
                const urlDoc = await UrlShorten.findOne({ originalUrl: original_url });
                console.log("Url Doc \n", urlDoc);
                if (urlDoc) {
                    return res.status(200).send({ status: 200, data: urlDoc, error: null, other_data: null, message: "UrlCode Fetch Successfully." })
                }
                let shortUrl = base_url + "/url/" + urlCode;

                const Items = new UrlShorten({
                    originalUrl: original_url,
                    urlCode: urlCode,
                    shortUrl: shortUrl,
                    created_at: new Date().getTime(),
                    updated_at: null
                })

                await Items.save();
                return res.status(200).send({ status: 200, data: Items, error: null, other_data: null, message: "UrlCode Added Successfully." })
            }
        } catch (error) {
            console.log("Error \n", error);
            return res.status(200).send({ status: 500, data: null, error: { message: error.message }, other_data: null, message: "Error While Adding UrlCode" })
        }
    },
    geturl: async (req, res, next) => {
        try {
            console.log("request \n", req);
            const urlCode = req.params.code;
            const item = await UrlShorten.findOne({ urlCode: urlCode });
            if (item) {
                return res.redirect(item.originalUrl);
            } else {
                return res.status(404).send("Url Doesn't Exist");
            }
        } catch (error) {
            console.log("Error \n", error);
            return res.status(500).send(error);
        }
    }
}