const express = require("express")
const path = require("path")
const { writeFile, readFile } = require("fs")
const userInputs = require("./Develop/db/db.json")
const { v4: uuidv4 } = require('uuid')
const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/userInputs", (req, res) =>
 res.sendFile(path.join(__dirname, "/Develop/public/notes.html")))


app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request to view previous userInputs recieved`)
    readFile("./Develop/db/db.json", "utf-8", (err, data) => {
        err? console.log(err): res.json(JSON.parse(data))
    })
    console.log(userInputs)
})

app.post
