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
            var that = this;

            $.getJSON('/getTodos', function(data) {
                // Format data corrdctly
                for (i in data){
                    data[i].date = new Date(data[i].date);
                }
                todos = data;
                that.redraw();
            });
            this.redraw();
        },
        add: function() {
            //Create a new todo
            var todo = {
                text: $("#addName").val(),
                date: new Date($("#addDate").val()),
                imp:  $("#addPriority").val(),
                done: false,
                tag: 1
            };

            $("#addForm").val("");
            $.ajax({
              url:"/addTodo",
              type:"POST",
              data:JSON.stringify(todo),
              contentType:"application/json; charset=utf-8",
              dataType:"json",
              success: function(){
                console.log("Send to server");
            }});
            return this.init();
        },
        redraw: function() {
            $("#todoList").empty();

            for (i in todos) {
                var date = todos[i].date.getDate() + "-" + (todos[i].date.getMonth()+1) + "-" + todos[i].date.getFullYear();
                var text = "<td><input type='checkbox' id=" + todos[i].id + " " + ischecked(todos[i]) + "></td><td>" +  "<button class='deleteTodo' id=" + todos[i].id + ">Delete</button></td><td><button class='updateTodo' id=" + todos[i].id + ">Update</button></td><td><button id=" + todos[i].id + " class='tagChange'>" + todos[i].tag + "</button></td><td>" + date + "</td><td>" + todos[i].imp;
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
            $.ajax({
              url:"/checkTodo",
              type:"POST",
              data:JSON.stringify({id: id}),
              contentType:"application/json; charset=utf-8",
              dataType:"json",
              success: function(){
                console.log("Send to server");
            }});
            this.init();
        },
        remove: function(id) {
            $.ajax({
              url:"/deleteTodo",
              type:"POST",
              data:JSON.stringify({id: id}),
              contentType:"application/json; charset=utf-8",
              dataType:"json",
              success: function(){
                console.log("Send to server");
            }});
            this.init();
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

            var todo = {
                id: id,
                text: $('#updateName').val(),
                date: new Date($('#updateDate').val()),
                imp: $('#updatePriority').val()
            }

            $.ajax({
              url:"/updateTodo",
              type:"POST",
              data:JSON.stringify(todo),
              contentType:"application/json; charset=utf-8",
              dataType:"json",
              success: function(){
                console.log("Send to server");
            }});
            this.init();

        },
        updateTag: function(id) {
            $.ajax({
                url:"/updateTodoTag",
                type:"POST",
                data:JSON.stringify({id: id}),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(){
                    console.log("Send to server");
                },
                error: function() {
                    console.log("error");
                }
            });
            this.init();
        }

    }
})();

var main = function() {

    // Main initialisation
    $("#addName").focus();
    TodoList.init();
    // var myVar = setInterval(myTimer, 1000);
    // function myTimer() {
    //     console.log("Polling new data from server");
    //     TodoList.init();
    // }

    // Create coockie if not exist
    if($.cookie('font-size') === undefined) {
        $.cookie('font-size', parseInt(14), { expires: 7 });
    }
    $("body").css({ 'font-size': $.cookie('font-size') + "px" });

    $('#increase-font').on('click', function() {
        $.cookie('font-size', parseInt($.cookie('font-size')) + 1);
        console.log($.cookie('font-size') + "px");
        $("body").css({ 'font-size': $.cookie('font-size') + "px" });
    });
    $('#decrease-font').on('click', function() {
        $.cookie('font-size', parseInt($.cookie('font-size')) - 1);
        $("body").css({ 'font-size': $.cookie('font-size') + "px" });
    });

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
    $("#todoList").on('click',"button[class='tagChange']", function(e) {
        TodoList.updateTag(e.target.id);
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
