import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'

//password for this test project : 'ILoveProgramming'

const __dirname = dirname(fileURLToPath(import.meta.url))
const port = 3000
const app = express()

var userIsAuthorised = false

app.use(bodyParser.urlencoded({extended: true}))

function passwordCheck(req, res, next){
    const password = req.body['password']
    if(password == "ILoveProgramming"){
        userIsAuthorised = true
    }
    next()
}

app.use(passwordCheck)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/check", (req, res) => {
    if(userIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html")
    }else{
        res.redirect("/")
    }
})

app.listen(port, () => {
    console.log(`The server is live at http://localhost:${port}`)
})