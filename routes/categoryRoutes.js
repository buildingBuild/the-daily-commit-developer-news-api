import express from 'express'
import { News, News2, News3 } from '../Models/news.model.js'
const router = express.Router();



router.get('/:sector', (req, res) => {

    console.log(req.params.sector)

    const codes = ["ai", "wb", "r", "c", "ds"]
    if (codes.includes(req.params.sector)) {

        console.log("YOUR IN")
    }
    else {
        res.status(400).json({ message: "Invalid Sector" })
    }

    console.log("You are in categories route")
    res.status(200).json({ name: "categories" })
})



export default router