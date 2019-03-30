const dbConfig = require('../dbConfig/config');
const mysql = require('mysql');
const pool = mysql.createPool({
    host : dbConfig.HOST,
    user : dbConfig.USER,
    password : dbConfig.PASSWORD,
    database : dbConfig.DATABASE,
    port : dbConfig.PORT
});

module.exports = pool;