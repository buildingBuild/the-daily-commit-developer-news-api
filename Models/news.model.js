import mongoose from 'mongoose'

const NewsSchema = mongoose.Schema({

    category: {
        type: String,
        required: [true, "Please enter a category or language"],
    }, Headline: {
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
    }, Date: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    }

},
    {
        timestamps: true
    }

);

const News = mongoose.model("Unapproved", NewsSchema, "Unapproved")
const News2 = mongoose.model("Categories", NewsSchema, "Categories")
const News3 = mongoose.model("Everything", NewsSchema, "Everything")
const News4 = mongoose.model("Everything", NewsSchema, "Languages")
//const everythingNews = mongoose.model
export { News, News2, News3, News4 }