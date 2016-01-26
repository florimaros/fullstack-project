"use-strict"

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '05011978',
  database: 'meals'
});

connection.connect();

function addItem(attributes, callback) {
  connection.query('INSERT INTO meals SET ?', attributes, function(err, result){
    if (err) throw err;
    return callback({"status": "ok"});
  });
}

function removeItem(id, callback) {
  connection.query('DELETE FROM meals WHERE id= ?', id, function(err, result) {
    if (err) throw err;
    if (result.affectedRows===1) {
      return callback({status: "ok" })
    }
    else if (result.affectedRows===0) {
      return callback({status: "not exists"})
    }
  });
}

function allItems(callback) {
  connection.query('SELECT * FROM meals ORDER BY id ASC', function(err, result) {
    if (err) throw err;
    return callback(result);
  });
}

function getLastAddedItem(callback) {
  connection.query('SELECT * FROM todo ORDER BY todo_id DESC LIMIT 1', function(err, result) {
    if (err) throw err;
    return callback(result);
  });
}

function setCompleted(id, callback){
  connection.query('UPDATE todo SET status="completed" WHERE todo_id= ?', id, function(err, result) {
    if (err) throw err;
    return callback(id);
  });
}

module.exports = {
  add: addItem,
  delete: removeItem,
  all: allItems,
  complete: setCompleted
};
