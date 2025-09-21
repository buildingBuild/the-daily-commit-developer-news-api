import express from 'express'
const router = express.Router();
import { News, News2, News3, News4 } from '../Models/news.model.js'


// javascript
// Java
// c++
// goLang
// Rust
// python

/*
copy text , turn to uppercase , turn all to lowercase,
 capitalize selected text, reword text with chatgpt , get link of current website
*/


router.get('/', async (req, res, next) => {
    try {
        console.log("Languages routes")

        const { language } = req.query
        let limit = parseInt(req.query.language) || 5
        const recent = req.query.recent || "true"
        let codes = ["Rust", "golang", "javascript", "cplusplus", "python", "java"]


        if (codes.includes(language, 0)) {

            if (recent === "true") {
                const langNews = await News4.aggregate([
                    { $match: { category: language } },
                    { $sample: { size: limit } },
                    { $sort: { Date: -1 } },
                    { $sort: { upvotes: -1 } }
                ]);
                res.status(200).json(langNews)
            }
            else {
                const langNews = await News4.aggregate([
                    { $match: { category: language } },
                    { $sample: { size: limit } },
                    { $sort: { upvotes: -1 } }
                ]);
                res.status(200).json(langNews)

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