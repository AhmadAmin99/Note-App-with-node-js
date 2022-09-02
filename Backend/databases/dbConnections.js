const mysql2 = require('mysql2');
const q = mysql2.createConnection({
    host:'localhost',
    user:'root',
    database:'noteapp',
    password:''
})

module.exports = q;