const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "209.97.175.18",
    user: "admin",
    password: "P@ssw0rd888",
    port: 3306,
    database: "sutdify",
})

module.exports = connection;