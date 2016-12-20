DB = require('./database.js');

module.exports = {
    findByUserId: function(userId, done) {
        DB.query("SELECT * FROM `todos` WHERE `owner` = " + userId + ";", function(rows) {
            done(rows)
        });
    },
    remove: function(id, done) {
        DB.query("DELETE FROM `todos` WHERE `id` = " + id + ";", function() {
            done();
        });
    }
}
