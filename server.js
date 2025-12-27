import express from 'express'
import lang from './routes/langRoutes.js'
import everything from './routes/everything.js'
import categories from './routes/categoryRoutes.js'
import fs from "fs/promises"
import databseConnect from './db/databaseConnect.js'
import errorHandler from './Middleware/error.js'
import cron from "node-cron"
import nodemailer from "nodemailer"
import connectionToDatabase from './db/databaseConnect.js'
import populateArticles from './services/populate.js'
import { app } from './app.js'
const port = process.env.PORT || 8000



connectionToDatabase()

//cron.schedule("* * * * *", populateArticles)

app.use(express.json())
app.use(express.urlencoded({ extended: false })) // for feature that might allow users to add posts

app.use('/news', everything)
app.use('/languages', lang)
app.use('/categories', categories)

app.use((req, res, next) => {
    const error = new Error('Route not found')
    error.status = 404;
    next(error);
})
app.use(errorHandler)


app.listen(port, "0.0.0.0", () => console.log(`Server is running on ${port}`))
