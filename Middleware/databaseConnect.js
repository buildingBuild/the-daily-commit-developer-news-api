import mongoose from 'mongoose'

let connectionToDatabase = (async (req, res, next) => {
    await mongoose.connect(process.env.DATABASE_STRING)
        .then(() => console.log("Connected to database"))
        .catch(() => {
            console.log("Unsuccesful")
            return res.status(500).json({
                message: "Critical Error if this persists contact the link below",
                link: "https://github.com/buildingBuild/the-daily-commit-developer-news-api/issues"
            })
        })
    next();
})

export default connectionToDatabase

