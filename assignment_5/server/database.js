var mysql = require('mysql');
var mysql_config = require('./config.js').mysql;

module.exports = {
    query: function(query, done) {
        var connection = mysql.createConnection(mysql_config);

        connection.connect();
        connection.query(query, function (err, rows, fields) {
          if (err) throw err
          done(rows);
      });
        connection.end();
    }
}
