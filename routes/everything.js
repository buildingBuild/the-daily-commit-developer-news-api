import express from 'express'
const router = express.Router();



router.get('/', (req, res) => {
    console.log("You are in everything route")
    res.status(200).json({ name: "everything" })
    return;
})

router.get('/random', (req, res) => {
    console.log("You are in everything random route")
    res.status(200).json({ name: "random" })
    return;
})




export default router