var mysqlModel = require('mysql-model');
var db = require('../../config/database.js');

const connection = mysqlModel.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

var wallet_balance = connection.extend({
    tableName: "progressing_game_history",
});
module.exports = wallet_balance;