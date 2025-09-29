import express from 'express'
import lang from './routes/langRoutes.js'
import everything from './routes/everything.js'
import categories from './routes/categoryRoutes.js'
import fs from "fs/promises"
import databseConnect from './Middleware/databaseConnect.js'
import errorHandler from './Middleware/error.js'
import cron from "node-cron"



const app = express();
const port = process.env.PORT || 8000

cron.schedule("*/10 * * * *", async function () {
    const databaseUpdated = false;
    const newPost = false;
    const currentDate = new Date();

    try {
        console.log("Lol") // would ping streams

    }
    catch (error) {
        console.log("Lol") // would ping streams
    }
    finally {
        const transporter = nodemailer.createTransport(
            {
                secure: true,
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: 'eneojo.solomon.u@gmail.com',
                    pass: process.env.EMAIL_PASS
                }
            }
        );

        await transporter.verify();
        let info = await transporter.sendMail({
            to: "solomonunwuchola@gmail.com",
            subject: `Cron service ${currentDate}`,
            text: `DATABASE UPDATED : ${databaseUpdated}`,

        })
        console.log("Sent", info.messageId)
    }
});


// Body parser 
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // for feature that might allow users to add posts


// App Use 
app.use(databseConnect)



app.use('/news', everything)
app.use('/languages', lang)
app.use('/categories', categories)



app.use((req, res, next) => {
    const error = new Error('Route not found')
    error.status = 404;
    next(error);
})
app.use(errorHandler)


app.listen(port, () => console.log(`Server is running on ${port}`))
