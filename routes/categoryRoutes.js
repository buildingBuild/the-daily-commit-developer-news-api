import express from 'express'
const router = express.Router();



router.get('/', (req, res) => {
    console.log("You are in categories route")
    res.status(200).json({ name: "categories" })
})



export default router