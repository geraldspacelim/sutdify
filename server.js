require('dotenv').config()
const sql = require("./connection")
const express = require('express')
const app = express() 
const path = require('path')
const { nanoid } = require("nanoid");
app.use(express.json());

const viewsPath = path.join(__dirname, './templates/views')
const publicDirectoryPath = path.join(__dirname, './public')
const web_regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('/', async (req, res) => {
    await sql.query(`select * from urls;`, (error, result) => {
        if (error) throw error;
        res.render('index')
    })    
})

app.post('/shortURL', async (req,res) => {
    if (req.body.longURL === '') {
        return res.send({error: {code: "EMPTY_URL"}})
    } else if (!web_regex.test(req.body.longURL)) {
        return res.send({error: {code: "FMT_ERR"}})
    }
    if (req.body.id === '') {
        req.body.id = nanoid(8)
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