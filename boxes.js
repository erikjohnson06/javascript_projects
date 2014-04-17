window.onload = init;

//Create global variable to use later as a counter
var counter = 0;

//Create event handlers for the generate and clear buttons
function init() {
var generateButton = document.getElementById("generateButton");
generateButton.onclick = generate;

var clearButton = document.getElementById("clearButton");
clearButton.onclick = clear;
};


//Create a constructor variable Box defining how div element information can be stored
function Box(id, name, amount, color, xPosition, yPosition) {
  this.id = id;
  this.name = name;
  this.amount = amount;
  this.color = color;
  this.xPosition = xPosition;
  this.yPosition = yPosition;
};


//Create the generate function
function generate() {
  var sceneDiv = document.getElementById("scene");
  var boxName = document.getElementById("name").value;
  
   //Create a validation statement for the name field
    if (boxName == "" || boxName == null) {
       alert("Please name your Amazing Box!");
       return false;
    }
    
  var boxColor = document.getElementById("color").options[document.getElementById("color").selectedIndex].value;
  var boxAmount = document.forms.data.elements.amount;
  
  //Create a validation statement for the radio buttons 
     var check = "";
     for (var i = 0; i < boxAmount.length; i++) {
          if (boxAmount[i].checked) {
            check = "validated";
            var amountSelected = boxAmount[i].value;
            console.log("Amount: " + amountSelected);
            console.log("Name: " + boxName);
            console.log("Color: " + boxColor);
          } 
     }
     if (check == "") {
        alert("Please select the number of Amazing Boxes you would like to generate!");
        return false;
     } 
     
  
//Use a loop to create new div elements
  for (var a = 0; a < amountSelected; a++) {
         var div = document.createElement("div");
         var x = Math.floor(Math.random() * (sceneDiv.offsetWidth-101));
         var y = Math.floor(Math.random() * (sceneDiv.offsetHeight-101));
         var uniqueId = "divId" + ++counter ;
         div.id = uniqueId;
         div.style.left = x + "px";
         div.style.top = y + "px";
         div.style.backgroundColor = boxColor;
         div.setAttribute("class", "box");
         div.setAttribute("name", boxName);
         var boxes = new Box(div.id, boxName, amountSelected, boxColor, div.style.left, div.style.top);
         div.onclick = display;
         div.innerHTML = boxName;
         sceneDiv.appendChild(div);
         console.log("ID: " + div.id);
         console.log("Name is: " + div.getAttribute("name"));
         console.log("X position: " + div.style.left);
         console.log("Y position: " + div.style.top);
         console.log("amountSelected: " + amountSelected);
         console.log(boxes);
  }    
  
  //Form reset after generating
  document.getElementById("data").reset();
};


//This function wil query all div elements for child nodes and remove them
function clear() {
   var allBoxes = document.querySelectorAll("div#scene div");
   console.log( allBoxes.length + " div elements have been cleared");
   var sceneDiv = document.getElementById("scene");
   if ( sceneDiv.hasChildNodes() )
      {
       while ( sceneDiv.childNodes.length >= 1 )
        {
        sceneDiv.removeChild(sceneDiv.firstChild);       
        } 
      }
};


//This function will display an alert containing information about the div element
function display() {
  var divId = this.id;
  var boxColor = this.style.backgroundColor;
  var boxName = this.getAttribute("name");
  var xPosition = this.style.left;
  var yPosition = this.style.top;
  alert("This element has the following information:" + "\n" + "ID: " + divId + "\n" + "Color: " + boxColor + "\n" + "Name: " + boxName
         + "\n" + "Position: " + xPosition + ", " + yPosition );          
};



