import mongoose from 'mongoose'

let connectionToDatabase = ((req, res, next) => {
    mongoose.connect(process.env.DATABASE_STRING)
        .then(() => console.log("Connected to database"))
        .catch(() => console.log("Unsuccesful"))


    next();
})

export default connectionToDatabase

