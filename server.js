import express from 'express'
import lang from './routes/langRoutes.js'
import everything from './routes/everything.js'
import categories from './routes/categoryRoutes.js'
const app = express();
const port = process.env.PORT || 3000


// Mock data
const newsArticle = {

    title: "Is Ai taking over our jobs",
    summary: "This article talks about the how ai is influencing the job market ",
    src: "",
    author: "John Lorenzo",
    category: "AI",
    Date: ""
}

const newsArticle_v2 = {

    title: "Aws adds sdk to Go langauge ",
    summary: "This article talks about aws building support for go ",
    src: "",
    author: "John Lorenzo",
    language: "Go",
    Date: ""
}





// Body parser 
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // for feature that might allow users to add posts


app.use('/', everything)
app.use('/languages', lang)
app.use('/categories', categories)


app.listen(port, () => console.log(`Server is running on ${port}`))
