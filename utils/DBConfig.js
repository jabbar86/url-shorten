const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//dev 
mongoose
    .connect(
        "URL" //Paste Your MongoDB URL
        , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch(console.log);

module.exports = {
    mongoose
};
