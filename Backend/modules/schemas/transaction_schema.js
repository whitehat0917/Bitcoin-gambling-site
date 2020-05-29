var mysqlModel = require('mysql-model');
var db = require('../../config/database.js');

const connection = mysqlModel.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

var transaction_history = connection.extend({
    tableName: "user_transaction_history",
});
module.exports = transaction_history;