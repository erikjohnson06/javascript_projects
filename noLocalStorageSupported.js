//This file will be used if no local storage is detected in the browser

//Get any existing items in the JSON file
function getTodoItems() {
    var request = new XMLHttpRequest();
    request.open("GET", "Lesson14_ToDoList.json");
    request.onreadystatechange = function() {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) { 
                parseTodoItems(this.responseText);
                addTodosToPage();
            }
            else {
                console.log("Error: JSON Data is empty");
            }
        }
    };
    request.send();
}

//Parse JSON items and push them to the todos array
function parseTodoItems(todoJSON) {
    if (todoJSON == null || todoJSON.trim() == "") {
        return;
    }
    var todoArray = JSON.parse(todoJSON);
    if (todoArray.length == 0) {
        console.log("Error: the to-do list array is empty!");
        return;
    }
    for (var i = 0; i < todoArray.length; i++) {
        var todoItem = todoArray[i];
        todos.push(todoItem);
    }
}

//Save an item to the JSON file
function saveTodoItem() {
    var todoJSON = JSON.stringify(todos);
    var request = new XMLHttpRequest();
    var URL = "saveData_Lesson14.php?data=" + encodeURI(todoJSON);
    console.log("URL: " + URL);
    request.open("GET", URL);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.onreadystatechange = function() {
        if (this.readyState == this.DONE && this.status == 200) {
            console.log("Ready State: " + this.readyState);
            console.log("Status: " + this.status + ", " + this.statusText)
            console.log("DONE: " + this.DONE);
            }
        else if (this.readyState == this.DONE && this.status == 404) {
             console.log("Ready State: " + this.readyState);
             console.log("Status: " + this.status + ", " + this.statusText)
            }
        else if (this.readyState == this.DONE && this.status == 500) {
             console.log("Ready State: " + this.readyState);
             console.log("Status: " + this.status + ", " + this.statusText)
            }
      };
    request.send();
}

//Update the web page, JSON file, and array if an item is marked as "Done"
function updateDone(e) {
    var span = e.target;
    var id = span.parentElement.id;
    var item;
    
    //Find the target item by looping through the array
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            item = todos[i];
            break;
        }
    }
    
    //Update array and webpage
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
    
    //Update the JSON file
    var todoJSON = JSON.stringify(todos);
    var request = new XMLHttpRequest();
    var URL = "saveData_Lesson14.php?data=" + encodeURI(todoJSON);
    console.log("URL: " + URL);
    request.open("GET", URL);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send();
}

//Delete an item from the web page, array, and JSON file
function deleteItem(e) {
    var span = e.target;
    var id = span.parentElement.id;

    // find and remove the item in the array
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
            break;
        }
    }
    
    // update JSON with the new array data
    var todoJSON = JSON.stringify(todos);
    var request = new XMLHttpRequest();
    var URL = "saveData_Lesson14.php?data=" + encodeURI(todoJSON);
    console.log("URL: " + URL);
    request.open("GET", URL);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send();
    
    // find and remove the item in the page
    var li = e.target.parentElement;
    var ul = document.getElementById("todoList");
    ul.removeChild(li);

    // hide search results
    hideSearchResults();
}