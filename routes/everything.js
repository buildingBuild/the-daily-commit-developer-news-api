import express from 'express'
import { News, News2, News3 } from '../Models/news.model.js'
const router = express.Router();


router.get('/', async (req, res) => {
    console.log("You are in everything route")

    // On this route users can only sort by recency and limit the amount they want
    try {

        const limit = parseInt(req.query.limit) || 20;
        let recent = req.query.recent === "true"


        if (recent) {
            const everythingNews = await News3.find().sort({ Date: -1 }).limit(limit)
            return res.status(200).json(everythingNews)
        }
        else {
            const everythingNews = await News3.aggregate([
                { $sample: { size: limit } }
            ]);
            return res.status(200).json(everythingNews);
        }

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ name: "something wrong" })

    }

})

// On this route users get only one random article 
router.get('/random', async (req, res) => {
    let limit = 1;
    const randomNews = await News3.aggregate([
        { $sample: { size: limit } }
    ]);
    return res.status(200).json(randomNews)

})

// On this route users get 5 posts that are highly rated
router.get('/weekyly_digest', async (req, res) => {
    console.log("You are in weekly Digest")
    let limit = 5;
    // Implement later in the schema
    // const weeklyDigest = await News3.find().sort({ rating: -1 }).limit(limit)

    return res.status(200).json(weeklyDigest)

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


router.post('/upvote', async (req, res) => {




})

export default router


function shuffle(array) {

    let shuffledArray = [];
    let usedIndexes = [];

    let i = 0;
    while (i < array.length) {

        let randNumber = Math.floor(Math.random() * array.length)
        if (!usedIndexes.includes(randNumber)) {
            shuffledArray.push(array[randNumber])
            usedIndexes.push(randNumber)
            i++
        }
    }
    return shuffledArray
}

