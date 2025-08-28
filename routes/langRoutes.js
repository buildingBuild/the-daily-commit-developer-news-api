import express from 'express'
const router = express.Router();



router.get('/', (req, res) => {

    console.log("You are in languages route")
    res.status(200).json({ name: "lang" })
    return;
})



export default router