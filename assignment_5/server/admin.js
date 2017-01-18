DB = require('./database.js');

module.exports = {
    getData: function(done) {
        DB.query("SELECT COUNT(*) AS total FROM `todos` WHERE 1;", function(rows) {
            done(rows[0]);
        });
    }
}
