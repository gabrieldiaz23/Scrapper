var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleModel = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    articleURL: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    }
});

var Article = mongoose.model("Article", articleModel);

module.exports = Article;