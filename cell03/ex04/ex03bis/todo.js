/* ---------- JQUERY VERSION ---------- */
/* ---------- COOKIE FUNCTIONS ---------- */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}

/* ---------- SAVE & LOAD ---------- */
function saveTodos() {
    var todos = [];
    $(".todo").each(function () {
        todos.push($(this).text());
    });
    setCookie("todos", JSON.stringify(todos), 7);
}

function loadTodos() {
    var data = getCookie("todos");
    if (!data) return;

    var todos = JSON.parse(data);

    // Reverse so newest stays on top after reload
    todos.reverse().forEach(function (text) {
        createTodo(text);
    });
}

/* ---------- CREATE TODO ---------- */
function createTodo(text) {
    var $div = $("<div>").addClass("todo").text(text);

    $div.on("click", function () {
        if (confirm("Do you want to remove this TO DO?")) {
            $div.remove();
            saveTodos();
        }
    });

    $("#ft_list").prepend($div);

    saveTodos();
}

/* ---------- ADD TODO ---------- */
function addTodo() {
    var text = prompt("Enter a new TO DO:");

    if (text && text.trim() !== "") {
        createTodo(text.trim());
    }
}

/* ---------- INIT ---------- */
$(function () {
    $("#newBtn").on("click", addTodo);
    loadTodos();
});