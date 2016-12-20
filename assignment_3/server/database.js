var mysql = require('mysql')

module.exports = {
    query: function(query, done) {
        var connection = mysql.createConnection({
          host: 'localhost',
          user: 'diego',
          password: 'diego',
          database: 'todos'
        })

        connection.connect()
        connection.query(query, function (err, rows, fields) {
          if (err) throw err
          done(rows);
        })
        connection.end();
    }
}
