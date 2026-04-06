/* ---------- COOKIE FUNCTIONS ---------- */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}

/* ---------- SAVE & LOAD ---------- */
function saveTodos() {
    let todos = [];
    document.querySelectorAll(".todo").forEach(el => {
        todos.push(el.textContent);
    });
    setCookie("todos", JSON.stringify(todos), 7);
}

function loadTodos() {
    let data = getCookie("todos");
    if (!data) return;

    let todos = JSON.parse(data);

    // Reverse so newest stays on top after reload
    todos.reverse().forEach(text => {
        createTodo(text);
    });
}

/* ---------- CREATE TODO ---------- */
function createTodo(text) {
    let div = document.createElement("div");
    div.className = "todo";
    div.textContent = text;

    div.addEventListener("click", function () {
        if (confirm("Do you want to remove this TO DO?")) {
            div.remove();
            saveTodos();
        }
    });

    let list = document.getElementById("ft_list");
    list.insertBefore(div, list.firstChild);

    saveTodos();
}

/* ---------- ADD TODO ---------- */
function addTodo() {
    let text = prompt("Enter a new TO DO:");

    if (text && text.trim() !== "") {
        createTodo(text.trim());
    }
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("newBtn").addEventListener("click", addTodo);
    loadTodos();
});