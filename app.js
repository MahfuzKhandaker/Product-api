// Load our app server using express somehow
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

app.use(morgan('short'))

// how to use Router??

const router = require('./routes/product.js')
app.use(router)

app.get("/", (req, res)=>{
    console.log("Responding to route")
    res.send("Hello from ROOOOOOT")
})

// localhost:3003
app.listen(3003, ()=>{
    console.log("Server is up and listening on port 3003....")
})

module.exports = router