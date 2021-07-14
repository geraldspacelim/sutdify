const mysql = require("mysql");

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: "admin",
    password: process.env.PASSWORD,
    port: 3306,
    database: process.env.DATABASE,
})

module.exports = connection;