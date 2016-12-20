DB = require('./database.js');

module.exports = {
    findByUserId: function(userId, done) {
        DB.query("SELECT * FROM `todos` WHERE `owner` = " + userId + ";", function(rows) {
            done(rows)
        });
    },
    find: function(id, done) {
        DB.query("SELECT * FROM `todos` WHERE `id` = " + id + ";", function(rows) {
            done(rows[0])
        });
    },
    remove: function(id, done) {
        DB.query("DELETE FROM `todos` WHERE `id` = " + id + ";", function() {
            done();
        });
    },
    create: function(todo, done) {
        todo.date = new Date(todo.date).toISOString().slice(0, 19).replace('T', ' ');
        if(todo.imp == '') {todo.imp = 1;}
        DB.query("INSERT INTO `todos` (`text`, `date`, `imp`, `done`, `tag`, `owner`) "
        +" VALUES (\'"+todo.text+"\', \'"+todo.date+"\', \'"+todo.imp+"\', 0, \'"+todo.tag+"\', "+ 1 +");", function() {
            done();
        });
    },
    update: function(todo, done) {
        todo.date = new Date(todo.date).toISOString().slice(0, 19).replace('T', ' ');
        if(todo.imp == '') {todo.imp = 1;}
        DB.query("UPDATE `todos` SET `text` = \'"+todo.text+"\', `date` = '" +todo.date +"', `imp` = " + todo.imp +" WHERE `id` = "+todo.id+";", function() {
            done();
        });
    },
    switchTag: function(id, done) {
        // Get current tad
        this.find(id, function(row) {
            var newTag = 1;
            if(row.tag <= 3) {
                newTag = row.tag+1;
            }
            else {
                newTag = 1;
            }
            DB.query("UPDATE `todos` SET `tag` = " + newTag +" WHERE `id` = " + id + ";", function() {
                done();
            });
        })
    },
    checkTodo: function(id, done) {
        this.find(id, function(row) {
            var newDone;
            if(row.done) {
                newDone = false;
            }
            else {
                newDone = true;
            }
            DB.query("UPDATE `todos` SET `done` = " + newDone +" WHERE `id` = " + id + ";", function() {
                done();
            });
        })
    }
}
