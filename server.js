const sql = require("./connection")
const express = require('express')
const app = express() 
const path = require('path')
const { nanoid } = require("nanoid");

require('dotenv').config({ path: path.resolve(__dirname, '/.env') })
app.use(express.json());
// sql.connect()

const viewsPath = path.join(__dirname, '/views')
const publicDirectoryPath = path.join(__dirname, '/public')

app.set('view engine', 'hbs');
app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('/', async (req, res) => {
    await sql.query(`select * from urls;`, (error, result) => {
        if (error) throw error;
        // res.render('index', {
        //     name: 'Gerald'
        // })
        res.render('index')
    })    
    
})

app.post('/shortURL', async (req,res) => {
    if (req.body.id === '') {
        req.body.id = nanoid()
    }
    await sql.query(`insert into urls (LongURL, Id) values ('${req.body.longURL}', '${req.body.id}')`, (error,result) => {
        if (error) {
            return res.send({error});
        }
        res.send({id : req.body.id})
    }) 
})

app.get('/:id', async (req, res) => {
    console.log("here")
    await sql.query(`select * from urls where Id = '${req.params.id}';`, (error, result) => {
        if (error) throw error; 
        res.redirect(result[0].LongURL)
    })
})


app.listen(process.env.PORT || 8080)