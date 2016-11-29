var TodoList = (function() {
    var todos = [];

    var ischecked = function(todo) {
        if(todo.done) {
            return "checked";
        }
        return "";
    }


function compareID(a,b) {
    if (a.id < b.id)
        return -1;
    if (a.id > b.id)
        return 1;
    return 0;
}
function compareDate(a,b) {
    if (a.date < b.date)
        return -1;
    if (a.date > b.date)
        return 1;
    return 0;
}
function comparePrio(a,b) {
    if (a.imp < b.imp)
        return -1;
    if (a.imp > b.imp)
        return 1;
    return 0;
}

    return {
        init: function() {
            todos.push({
                    id: 2,
                    text: "TestA",
                    date: new Date("2-1-2016"),
                    imp: 3,
                    done: true
                });
            todos.push({
                    id: 4,
                    text: "TestB",
                    date: new Date("1-1-2016"),
                    imp: 30,
                    done: false
                });
            todos.push({
                    id: 3,
                    text: "TestC",
                    date: new Date("5-2-2016"),
                    imp: 7,
                    done: true
                });
            this.redraw();
        },
        add: function() {
            // Get the next available ID
            var todos_copy = todos;
            todos_copy.sort(compareID);
            var max = todos[todos.length - 1].id;

            //Create a new todo
            var todo = {
                id: max+1,
                text: $("#addName").val(),
                date: new Date($("#addDate").val()),
                imp:  $("#addPriority").val(),
                done: false,
            };

            $("#addForm").val("");
            todos.push(todo);

            return this.redraw();
        },
        redraw: function() {
            $("#todoList").empty();

            for (i in todos) {
                var date = todos[i].date.getDate() + "-" + (todos[i].date.getMonth()+1) + "-" + todos[i].date.getFullYear();
                var text = "<td><input type='checkbox' id=" + todos[i].id + " " + ischecked(todos[i]) + "></td><td>" +  "<button class='deleteTodo' id=" + todos[i].id + ">Delete</button></td><td><button class='updateTodo' id=" + todos[i].id + ">Update</button>" + date + "</td><td>" + todos[i].imp;
                if(todos[i].done)   {
                    $("#todoList").append("<tr>" + text + "<td><strike>" + todos[i].text + "</strike>" + "</tr>");
                }
                else {
                    $("#todoList").append("<tr>" + text + "<td>" + todos[i].text + "" + "</tr>");
                }
            }
        },
        sortID: function() {
            todos.sort(compareID);
            this.redraw();
        },
        sortDate: function() {
            todos.sort(compareDate);
            this.redraw();
        },
        sortPrio: function() {
            todos.sort(comparePrio);
            this.redraw();
        },
        check: function(id) {
            for(i in todos)
            {
                if(todos[i].id == id){
                    if(todos[i].done) {
                        todos[i].done = false;
                    }
                    else {
                        todos[i].done = true;
                    }
                }
            }
            this.redraw();
        },
        remove: function(id) {
            for(i in todos)
            {
                if(todos[i].id == id){
                    todos.splice(i, 1);
                    return this.redraw();
                }
            }
            this.redraw();
        },
        load: function(id) {
            for(i in todos)
            {
                if(todos[i].id == id){
                    var uTodo = todos[i];
                }
            }
            var d = uTodo.date;
            var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
            $('#updateName').val(uTodo.text);
            $('#updateDate').val(datestring);
            $('#updatePriority').val(uTodo.imp);
            $('#updateID').val(uTodo.id);

        },
        update: function() {
            var id = $('#updateID').val();
            for(i in todos)
            {
                if(todos[i].id == id){
                    var id = i;
                }
            }
            todos[i].text = $('#updateName').val();
            todos[i].date = new Date($('#updateDate').val());
            todos[i].imp = $('#updatePriority').val();
            this.redraw();

        }

    }
})();

var main = function() {

    // Main initialisation
    $("#addName").focus();
    TodoList.init();


    // Listners
    $("#todoList").on('click',"input[type='checkbox']", function(e) {
        TodoList.check(e.target.id);
    });
    $("#todoList").on('click',"button[class='deleteTodo']", function(e) {
        TodoList.remove(e.target.id);
    });
    $("#todoList").on('click',"button[class='updateTodo']", function(e) {
        TodoList.load(e.target.id);
    });

    $("#addButton").on("click", function() {
        TodoList.add();
    });
    $("#updateButton").on("click", function() {
        TodoList.update();
    });

    $("#sortID").on("click", function() {
        TodoList.sortID();
    });
    $("#sortDate").on("click", function() {
        TodoList.sortDate();
    });
    $("#sortPrio").on("click", function() {
        TodoList.sortPrio();
    });
    $(".inputForm").on("keypress", function(event) {
        if(event.keyCode == 13) {
            TodoList.add();
        }
    });


};


$(document).ready(main);
