import express from 'express'
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



app.get('/', (req, res) => {



    res.status(200).json()


})

app.get('/random', (req, res) => {



    res.status(200).json()


})




app.get('/categories', (req, res) => {



    res.status(200).json()


})


app.get('/languages', (req, res) => {



    res.status(200).json()


})



app.listen(port, () => console.log(`Server is running on ${port}`))
