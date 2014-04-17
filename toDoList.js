//Contructor function to build the To Do List array
function Todo(id, task, who, dueDate, timeRemaining, location) {
    this.id = id;
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
    this.timeRemaining = timeRemaining;
    this.location = location;
    this.done = false;
}

var latlong = "No location";

var todos = new Array();

var map = null;

function init() {
    var submitButton = document.getElementById("submit");
    submitButton.onclick = getFormData;

    var searchButton = document.getElementById("searchButton");
    searchButton.onclick = searchTodos;
    
    var clearButton = document.getElementById("clearButton");
    clearButton.onclick = clearSearchResults;

    getTodoItems();
    getLocation();
}

//Display any existing To Do list items on the page
function addTodosToPage() {
    var ul = document.getElementById("todoList");
    var listFragment = document.createDocumentFragment();
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodo(todoItem);
        listFragment.appendChild(li);
    }
    ul.appendChild(listFragment);
}

//Display new To Do list items on the page
function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    var li = createNewTodo(todoItem);
    ul.appendChild(li);
    document.forms[0].reset();
}

//Specify the creation and style of list items
function createNewTodo(todoItem) {
    var li = document.createElement("li");
    li.setAttribute("id", todoItem.id);

    var spanTodo = document.createElement("span");
    
    //If the time remaining to complete the task is less than zero, 
    //then mark the task as overdue.
    if (todoItem.timeRemaining < 0) {
           var daysOverDue = Math.abs(todoItem.timeRemaining);
           spanTodo.innerHTML = "( " + todoItem.location +  " )   " + todoItem.who + " needs to " + todoItem.task + " by " + 
                                todoItem.dueDate + "   ( " + daysOverDue + " day(s) overdue)";
    }
    
    //If the time remaining is greater to or equal to zero, display 
    //how many days remain to complete the task.
    if (todoItem.timeRemaining >= 0) {
         if (todoItem.timeRemaining == 1) {
           spanTodo.innerHTML = "( " + todoItem.location +  " )   " + todoItem.who + " needs to " + todoItem.task + " by " + 
                                todoItem.dueDate + "   (" + todoItem.timeRemaining + " day remaining)";
         }
         else {
           spanTodo.innerHTML = "( " + todoItem.location +  " )   " + todoItem.who + " needs to " + todoItem.task + " by " + 
                                todoItem.dueDate + "   (" + todoItem.timeRemaining + " days remaining)"; 
        }
    }

    //Toggle the class from done to undone
    var spanDone = document.createElement("span");
    if (!todoItem.done) {
        spanDone.setAttribute("class", "notDone");
        spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    else {
        spanDone.setAttribute("class", "done");
        spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
    }

    //Click handler to update the done state
    spanDone.onclick = updateDone;

    //Add the delete link
    var spanDelete = document.createElement("span");
    spanDelete.setAttribute("class", "delete");
    spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";

    //Add the click handler to delete the item
    spanDelete.onclick = deleteItem;

    li.appendChild(spanDone);
    li.appendChild(spanTodo);
    li.appendChild(spanDelete);

    return li;
}

//Gather the form data and push it to the array as a new object
function getFormData() {
    var task = document.getElementById("task").value;
    var who = document.getElementById("who").value;
    var dateInput = document.getElementById("dueDate").value;
    var location = latlong;
    console.log("Test: " + location);
    
    //Use try and catch for potential errors in user input
    try {
       
       if (task == null || task == "") {
          throw new Error("Please enter a task.");
       }

       if (who == null || who == "") {
          throw new Error("Please enter a person to do the task");
       }

       if (dateInput == null || dateInput == "") {
          throw new Error("Please enter a date.");
       }

       //Ensure date is a valid format before processing MM/DD/YYYY or MM-DD-YYYY
       var re = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/ig;
       var results = dateInput.match(re);
       
  
       if (!dateInput.match(re)) {
           console.log("Results: " + results);
           console.log("Date entered: " + dateInput);
           throw new Error("Please use a valid format: MM/DD/YYYY or MM-DD-YYYY");
        } 
 
       //Is user input passes validation, then push it to the array and save it
       //to either local storage or JSON, depending on what is available.
       else {
       var dateMillis = Date.parse(dateInput);
       console.log(dateMillis);
       var date = new Date(dateMillis).toLocaleDateString();
       var currentTime = (new Date()).getTime();
       var diff = dateMillis - currentTime;
       var days = Math.ceil(diff / 1000 / 60 / 60 / 24);
       console.log("Current Time: " + currentTime + ", Difference: " + diff  + 
             ", Days remaining: " + days);
       
       var id = (new Date()).getTime();
       var todoItem = new Todo(id, task, who, date, days, location);
       todos.push(todoItem);
       addTodoToPage(todoItem);
       saveTodoItem(todoItem);
       console.log(todoItem);
      }
    }
    
    catch(exception) {
        alert(exception.message)
    }
    
    //Hide search results
    hideSearchResults();
}



// Search the items in the list using this function
function searchTodos() {

    //Clear previous results
    clearSearchResults();
    
    var searchTerm = document.getElementById("searchTerm").value;
    
    if (searchTerm == null || searchTerm  == "") {
        alert("Please enter a search term");
        return;
    }    
    
    var count = 0;
    
    //Loop through all the items in the list
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        
        //Match the search term, regardless of case
        var re = new RegExp(searchTerm, "i");
        
        if (todoItem.task.match(re) || todoItem.who.match(re)) {
        
            //If a match is found, add the item to the search results
            addSearchResultToPage(todoItem);
            
            //Keep a count of the number of items matched
            count++;
        }
    }
    //If no items are matched, display "no results" in the search results list
    if (count == 0) {
        var ul = document.getElementById("searchResultsList");
        var li = document.createElement("li");
        li.innerHTML = "No results were found.";
        ul.appendChild(li);
    }
    //Show the search results
    showSearchResults();
}

//Add a search result to the search results list in the page
function addSearchResultToPage(todoItem) {
    var ul = document.getElementById("searchResultsList");
    var li = document.createElement("li");
    li.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
    ul.appendChild(li);
}

//Clear the previous search results
function clearSearchResults() {
    var ul = document.getElementById("searchResultsList");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

// Hide the search results unless the user has searched for something
function hideSearchResults() {
    var div = document.getElementById("searchResults");
    div.style.display = "none";
    clearSearchResults();
}

//Show the search results
function showSearchResults() {
    var div = document.getElementById("searchResults");
    div.style.display = "block";
    document.forms[0].reset();
}        