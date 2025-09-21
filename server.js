import express from 'express'
import lang from './routes/langRoutes.js'
import everything from './routes/everything.js'
import categories from './routes/categoryRoutes.js'
import fs from "fs/promises"
import databseConnect from './Middleware/databaseConnect.js'
import errorHandler from './Middleware/error.js'


const app = express();
const port = process.env.PORT || 8000


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
