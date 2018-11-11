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

const PORT = process.env.PORT || 3003;
app.listen(PORT, ()=>{
      console.log("Server is up and listening on port: " + PORT)
})

// module.exports = router