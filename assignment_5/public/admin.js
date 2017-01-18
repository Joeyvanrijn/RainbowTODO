var AdminPanel = (function() {
 return {
        init: function() {
            $.getJSON('/adminData', function(data) {
                console.log(data);
                $("#adminList").append("<tr><td>Total todo's</td><td>" + data.total + "</td></tr>");
            });
        }
    }
})();

var main = function() {
    console.log("Page loaded");
    AdminPanel.init();
};


$(document).ready(main);
