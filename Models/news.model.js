import mongoose from 'mongoose'

const NewsSchema = mongoose.Schema({

    Category_Language: {
        type: String,
        required: [true, "Please enter a category or language"],
    }, Headline: {
        type: String,
        required: [true, "Please enter a Headline"],
    }, Summary: {
        type: String,
        required: false
    }, Link: {
        type: String,
        required: [true, "Src link must be entered"]
    }, Src: {
        type: String,
        required: false
    }, Author: {
        type: String,
        required: false
    },

    /*
    Headline
    "Nvidia Sales Jump 56%, a Sign the A.I. Boom Isn`t Slowing Down"
    summary
    "This article defends the allegations that ai is slowing down by citing…"
    link
    "https://www.nytimes.com/2025/08/27/technology/nvidia-earnings-ai-chips…"
    src
    "The New York Times"
    author
    "Tripp Mickle"
    */

},
    {
        timestamps: true
    }

);

const News = mongoose.model("Unapproved", NewsSchema)
module.exports = News;