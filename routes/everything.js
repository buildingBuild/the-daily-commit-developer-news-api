import express from 'express'
import newsModel from '../Models/news.model.js'
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("You are in everything route")

    try {
        const newsss = await newsModel.find({})
        res.status(200).json(newsss)

    } catch (err) {

        res.status(500).json({ name: "something wrong" })
        return;
    }

})

router.get('/random', (req, res) => {
    console.log("You are in everything random route")
    return res.status(200).json({ name: "random" })

})

router.post('/', async (req, res) => {


    console.log("You are in Post Route")
    //console.log(req.query)

    const { category, language, headline, link } = req.body

    if ((!category && !language) || !headline || !link) {

        return res.status(400).json({
            message: "You are missing rquired fields possibly headline, link, and either category or language."
        })
    }
    else {
        console.log("Here")
        try {
            const new_News = new newsModel(req.body)
            const savedContent = await new_News.save()
            console.log(savedContent)
        }
        catch (err) {
            console.log("Error: ", err)
            return res.status(500).json({
                message: "Failed to Post, If this issue persists contact through link",
                link: "https://github.com/buildingBuild/the-daily-commit-developer-news-api/issues",
                err: err.message
            })
        }

        console.log("Saved Succesfully")
        return res.status(201).json({ message: "done" })
    }




})

export default router


/*


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

*/