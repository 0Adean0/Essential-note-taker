const express = require("express")
const path = require("path")
const { writeFile, readFile } = require("fs")
const notes = require("./Develop/db/db.json")
const { v4: uuidv4 } = require('uuid')
const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/notes", (req, res) =>
 res.sendFile(path.join(__dirname, "/Develop/public/notes.html")))


app.get("/api/notes", (req, res) => {
    console.info(`${req.method} desire to view previous notes recieved`)
    readFile("./Develop/db/db.json", "utf-8", (err, data) => {
        err? console.log(err): res.json(JSON.parse(data))
    })
    console.log(userInputs)
})

app.post("/api/notes", (req, res) => {
    console.info(`${req.method} desire to add and access new notes recieved`)
    const{title,text} =req.body
    if(title&&text){
        const newUserInput ={
            title, text,id: uuidv4(),
        } 
        readFile(`/Develop/db/db.json`, "utf-8", (err,data) => {
    if(err){
        throw err
    }
    const dataString = JSON.parse(data)
    dataString.push(newUserInput)
    writeFile(`/Develop/db/db.json`, JSON.stringify(dataString, null,4), (err) => err? console.error(err):
    console.log("notes written to JSON")
    )
    })
    const response={
        status:"complete",
        body:newUserInput,
    }
    }
})
app.get("*",(req, res) =>
res.sendFile(path.join(__dirname,"/Develop/.public/index.html")))
