import express from 'express'
import { News, News2 } from '../Models/news.model.js'
const router = express.Router();



const mockData1 = {

    Headline: "Nvidia Sales Jump 56%, a Sign the A.I. Boom Isn`t Slowing Down",
    summary: "This article defends the allegations that ai is slowing down by citing nvidias sales jump ",
    link: "https://www.nytimes.com/2025/08/27/technology/nvidia-earnings-ai-chips.html#",
    src: "The New York Times",
    author: "Tripp Mickle",
    category: "AI",
    Date: ("2025-08-27T00:00:00Z")

}
router.get('/', async (req, res) => {
    console.log("You are in everything route")

    // On this route users can only sort by recency and limit the amount they want
    try {
        //let aritcles = [];
        let limit;
        let recent;

        let limitDef = false;
        let recentDef = false;

        if (!req.query.limit) {
            limit = 20
            limitDef = true
        }
        if (!req.query.recent) {
            recent = false;
            recentDef = true
        }


        if (limitDef == false) {
            limit = parseInt(req.query.limit)
            limit = req.query.limit
        }
        if (recentDef == false && (req.query.recent == "true" || req.query.recent == "false")) {

            recent = req.query.recent
        }



        console.log(limit)
        console.log(recent)



        return res.status(200).json({ name: "you won" })

        // articles.slice(0, limit)
        // const newsss = await newsModel.find().sort({ Date: 1 })
        // const everythingNews = await News2.find().sort({ Date: -1 })
        // res.status(200).json(everythingNews)
        // let newArray = 
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ name: "something wrong" })
        return;
    }

})

// On this route users get only one random article 
router.get('/random', (req, res) => {
    console.log("You are in everything random route")
    return res.status(200).json({ name: "random" })

})

// On this route users get 5 posts that are highly rated
router.get('/weekyly_digest', (req, res) => {
    console.log("You are in weekly Digest")
    let limit = 5;

    return res.status(200).json({ name: "weeklyDigest" })

})


// On this route users get 5 posts that are highly rated
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


// What I learnt (put in notebook later)
/*
in the env string after./net specify which database you want to use

*/