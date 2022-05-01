var mysql = require('mysql');
const credentials = require('../config/config');

var mysqlConnection = mysql.createPool({
    user     : credentials.mysql.user,
    password : credentials.mysql.password,
    database : credentials.mysql.database,
    host     : credentials.mysql.host
});

mysqlConnection.getConnection(function (err){
    if(err){
        console.log(' Error connecting to database',err);
    } else {
        console.log(' Conected to MySQL ');
    }
});

module.exports = mysqlConnection;