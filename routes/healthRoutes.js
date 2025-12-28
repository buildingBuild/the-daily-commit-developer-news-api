import express from 'express'
import mongoose from 'mongoose'
const router = express.Router();

router.get('/', (req, res) => { // this route is specifically for aws load balancers to help with debugging
    return res.status(200).json("Application responding")
})


router.get('/db-connect', async (req, res) => { // 
    await mongoose.connect(process.env.DATABASE_STRING)
        .then(() => console.log("Connected to database"))
        .catch(() => {
            console.log("Unsuccesful")
            return res.status(500).json({
                message: "Unable to connect to db",
                link: "https://github.com/buildingBuild/the-daily-commit-developer-news-api/issues"
            })
        })
    return res.status(200).json("Database running & responding")
})











export default router