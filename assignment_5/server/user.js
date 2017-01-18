var mysql = require('mysql');

module.exports = {
    findOrCreate: function(googleId, name,  done) {
        DB.query("SELECT * FROM `users` WHERE `googleId` = " + mysql.escape(googleId) + ";", function(rows) {
            if(rows.length === 0) {
                DB.query("INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `googleId`) VALUES (NULL, " + mysql.escape(name) + ", NULL, NULL, NULL, "+mysql.escape(googleId)+");", function(rows) {
                    console.log("Creating new user");
                    done(null, rows.insertId);
                });
            }
            else {
                console.log("Logging in with existing user.")
                done(null, rows[0].id);
            }
        }
        );
    },
    getName: function(id, done) {
        DB.query("SELECT `name` FROM `users` WHERE `id` = " + mysql.escape(id) + ";", function(rows) {
            console.log(rows[0].name);
            done(rows[0].name);
        });
    }
};
