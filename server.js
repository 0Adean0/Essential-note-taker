const express = require("express")
const path = require("path")
const { writeFile, readFile } = require("fs")
const notes = require("./db/db.json")
const { v4: uuidv4 } = require('uuid')
const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/notes", (req, res) =>
 res.sendFile(path.join(__dirname, "/public/notes.html")))


app.get("/api/notes", (req, res) => {
    console.info(`${req.method} desire to view previous notes recieved`)
    readFile("./db/db.json", "utf-8", (err, data) => {
        err? console.log(err): res.json(JSON.parse(data))
    })
    console.log(notes)
})

app.post("/api/notes", (req, res) => {
    console.info(`${req.method} desire to add and access new notes recieved`)
    const{title,text} =req.body
    if(title&&text){
        const newNotes ={
            title, text,id: uuidv4(),
        } 
        readFile(`./db/db.json`, "utf-8", (err,data) => {
    if(err){
        throw err
    }
    const dataString = JSON.parse(data)
    dataString.push(newNotes)
    writeFile(`./db/db.json`, JSON.stringify(dataString, null,4), (err) => err? console.error(err):
    console.info("notes written to JSON")
    )
    })
    const confirmation ={
        status: success,
        body: newNotes,
    }
    }
})
app.get("*",(req, res) =>
res.sendFile(path.join(__dirname,".public/index.html")));

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
