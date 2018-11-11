// Will contain all of my product router

const express = require('express')
const mysql = require('mysql')

// Create connection 
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'mydb'
})

function getConnection() {
    return pool
}

const router = express.Router()
router.get('/messages', (req, res) =>{
    console.log("Responding to router....")
    res.end()
})


router.post('/product_create', (req, res)=>{
    console.log("Trying to create a new product")
    console.log("How do we get form data???")

    console.log("Product Name: " + req.body.name)
    const productName = req.body.name
    const productTitle = req.body.title
    const productDescription = req.body.description
    const product_imageUrl = req.body.imageUrl

    const queryString = "INSERT INTO mydb.products (name, title, description, imageUrl) VALUES (?, ?, ?, ?)"
    getConnection().query(queryString, [productName, productTitle, productDescription, product_imageUrl], (err, results, fields)=>{
        if (err){
            console.log("Failed to insert new product: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted a new product with id: " + results.insertId)
         res.end()
    })

})

router.get("/products", (req, res)=>{
    console.log("We are getting products")

    const connection = getConnection()
    const queryString = "SELECT * FROM mydb.products"
    connection.query(queryString, (err, rows, fields)=>{
        if (err){
            console.log("Failed to query for products: " + err)
            res.statusCode(500)
            return
        }
        res.json(rows)
    })
  })

  
router.get('/product/:id', (req, res)=>{
    console.log("Fetching product with id: " + req.params.id)
    
    const connection = getConnection()
    const productId = req.params.id
    const queryString = "SELECT * FROM mydb.products WHERE id = ?"
    connection.query(queryString, [productId], (err, rows, fields) =>{
        if (err){
            console.log("Failed to query for products: " + err)
            res.statusCode(500)
            return
        }
        console.log("I think we fetched products successfully")
        
        const products = rows.map((row)=>{
            return {
                id: row.id,
                name: row.name,
                title: row.title,
                description: row.description,
                imageUrl: row.imageUrl
            }
        })
        
        res.json(products)
    })

   // res.end()
})

module.exports = router