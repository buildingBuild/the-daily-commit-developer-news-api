import express from 'express'
import { News, News2, News3 } from '../Models/news.model.js'
import voted from '../Models/voted.model.js';
const router = express.Router();


router.get('/', async (req, res) => {
    console.log("You are in everything route")

    // On this route users can only sort by recency and limit the amount they want
    try {

        const limit = parseInt(req.query.limit) || 20;
        let recent = req.query.recent === "true"


        if (recent) {
            const everythingNews = await News3.aggregate([
                { $sort: { Date: -1 } },
                { $sample: { size: limit } },
                { $sort: { upvotes: -1 } }
            ]);
            return res.status(200).json(everythingNews)
        }
        else {
            const everythingNews = await News3.aggregate([
                { $sample: { size: limit } },
                { $sort: { upvotes: -1 } }
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
router.get('/weekly_digest', async (req, res) => {
    console.log("You are in weekly Digest")
    let limit = 5;
    const weeklyDigest = await News3.find().sort({ rating: -1 }).limit(limit)

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
    let userVote
    try {
        const clientip = req.ip // using this to prevent user from voting twice
        const { newsId, vote } = req.body

        if (!newsId || !vote) {
            return res.status(400).json({ message: "You are missing required fields" })
        }
        else {

            userVote = parseInt(vote)
            if (!isNaN(userVote) && (userVote === 1 || userVote === -1)) {

                const articleExist = await News3.findOne({ _id: newsId })
                if (!articleExist) return res.status(404).json({ message: "Article does not exist" })

            } else {
                return res.status(404).json({ message: "Vote must be either 1 or -1 and must be a number" })
            }

        }


        const result = await voted.findOne({ id: newsId, ip_address: req.ip })

        if (!result) { // allows user votes

            if (userVote == 1) {
                const newsArticle = await News3.updateOne({ _id: newsId },
                    { $inc: { rating: 1 } })
            }
            else if (userVote == -1) {
                const newsArticle = await News3.updateOne({ _id: newsId },
                    { $inc: { rating: -1 } })
            }
            else {
                return res.status(400).json({ message: "Your vote has to be -1 to decrease or 1 to add" })
            }
            await voted.insertOne({
                id: newsId,
                ip_address: req.ip
            })
            return res.status(200).json({ message: "Voted! Good Job" })

        }
        else {
            return res.status(403).json({ message: "You can not vote more than once" })
        }



    }
    catch (err) {
        console.error(err)
        return res.status(400).json({ message: "Bad request", erroMessage: err.message })
    }

})

export default router



