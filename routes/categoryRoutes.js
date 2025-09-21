import express from 'express'
import { News, News2, News3 } from '../Models/news.model.js'
const router = express.Router();




router.get('/', async (req, res) => {

    try {


        const { searchCategory } = req.query
        const limit = parseInt(req.query.limit) || 5;
        const recent = req.query.recent || "true"

        let codes = ["AI", "webDev", "Robotics", "cybersecurity", "dScience"]

        if (codes.includes(searchCategory, 0)) {

            console.log(searchCategory)


            if (recent == "true") {
                const categoryNews = await News2.aggregate([
                    { $match: { category: searchCategory } },

                    { $sample: { size: limit } },
                    { $sort: { Date: -1 } },
                    { $sort: { upvotes: -1 } }
                ]);

                return res.status(200).json(categoryNews)
            }
            else {
                const categoryNews = await News2.aggregate([
                    { $match: { category: searchCategory } },
                    { $sample: { size: limit } },
                    { $sort: { upvotes: -1 } }
                ]);
                return res.status(200).json(categoryNews);
            }

        }
        else {
            res.status(400).json({ message: "Invalid Sector" })
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }


})






export default router