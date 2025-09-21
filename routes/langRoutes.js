import express from 'express'
const router = express.Router();
import { News, News2, News3 } from '../Models/news.model.js'


// javascript
// Java
// c++
// goLang
// Rust
// python
router.get('/', async (req, res) => {
    console.log("You are in languages route")


    try {

        const { language } = req.query
        let limit = req.query.language || 5


        const categoryNews = await News2.aggregate([
            { $match: { category: language } },
            { $sample: { size: limit } },
            { $sort: { Date: -1 } },
            { $sort: { upvotes: -1 } }
        ]);

        res.status(200).json({ name: "lang" })


    }
    catch (err) {
        res.status(200).json({ message: err.message })
    }

})



export default router