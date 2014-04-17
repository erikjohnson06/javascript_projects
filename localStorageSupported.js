//This file will be used if local storage is detected in the browser

//Get any existing items in local storage
function getTodoItems() {
    for (var i = 0; i < localStorage.length; i++) {
         var key = localStorage.key(i);
         if (key.substring(0, 4) == "todo") {
             var item = localStorage.getItem(key);
             var todoItem = JSON.parse(item);
             todos.push(todoItem);
         }
    }
    addTodosToPage();
}

//Save an item to the local storage
function saveTodoItem(todoItem) {
    var key = "todo" + todoItem.id;
    var item = JSON.stringify(todoItem);
    localStorage.setItem(key, item);
}

//Update the web page, local storage, and array if an item is marked as "Done"
function updateDone(e) {
    var span = e.target;
    var id = span.parentElement.id;
    var item;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            item = todos[i];
            break;
        }
    }
    if (item.done == false) {
        item.done = true;
        span.setAttribute("class", "done");
        span.innerHTML = "&nbsp;&#10004;&nbsp;";
    }
    else if (item.done == true) {
        item.done = false;
        span.setAttribute("class", "notDone");
        span.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    var itemJson = JSON.stringify(item);
    var key = "todo" + id;
    localStorage.setItem(key, itemJson);
}

//Delete an item from the web page, array, and local storage
function deleteItem(e) {
    var span = e.target;
    var id = span.parentElement.id;

    // find and remove the item in localStorage
    var key = "todo" + id;
    localStorage.removeItem(key);

    // find and remove the item in the array
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
            break;
        }
    }

    // find and remove the item in the page
    var li = e.target.parentElement;
    var ul = document.getElementById("todoList");
    ul.removeChild(li);

    // hide search results
    hideSearchResults();
}
