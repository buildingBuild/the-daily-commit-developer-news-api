import mongoose from 'mongoose'

const NewsSchema = mongoose.Schema({

    category: {
        type: String,
        required: [true, "Please enter a category or language"],
    }, headline: {
        type: String,
        required: [true, "Please enter a Headline"],
    }, summary: {
        type: String,
        required: false
    }, link: {
        type: String,
        required: [true, "link must be entered"]
    }, src: {
        type: String,
        required: false
    }, author: {
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

const News = mongoose.model("Unapproved", NewsSchema, "Unapproved")

export default News