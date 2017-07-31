document.addEventListener("DOMContentLoaded", function(event) {
  addButtonClickListener();
  addHouseholdTable();
});

function addButtonClickListener() {
  var addButton = document.getElementsByClassName("add")[0];
  addButton.addEventListener("click", function(event) {
    event.preventDefault();
    processForm();
    clearForm();
  });
}

function addHouseholdTable() {
  var submitButton = findSubmitButton();
  var table = createTable();
  submitButton.parentNode.insertBefore(table, submitButton.nextSibling);
  removeButtonClickListener();
}

function createTable() {
  var table = document.createElement("table");
  table.setAttribute("id", "members");
  var tr = document.createElement("tr");
  var th1 = document.createElement("th");
  var th2 = document.createElement("th");
  var th3 = document.createElement("th");
  var th4 = document.createElement("th");
  var age = document.createTextNode("Age");
  var rel = document.createTextNode("Relationship");
  var smoker = document.createTextNode("Smoker?");
  var action = document.createTextNode("Action");
  th1.appendChild(age);
  th2.appendChild(rel);
  th3.appendChild(smoker);
  th4.appendChild(action);
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  table.appendChild(tr);
  return table
}

function removeButtonClickListener() {
  var table = document.getElementById("members");
  table.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.getAttribute("class") == "remove") {
      var tr = event.target.parentNode.parentNode;
      tr.parentNode.removeChild(tr)
    }
  });
}

function findSubmitButton() {
  var buttons = document.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    if(buttons[i].type == "submit"){
      return buttons[i]
    }
  }
  return []
}

function processForm() {
  var person = getFormInfo();
  person.addPersonOnTable();
}

function getFormInfo() {
  var person = new Person();
  person.getFormAge();
  person.getFormRelationship();
  person.getFormSmoker();
  return person
}

function Person() {
  this.age = null;
  this.relationship = null;
  this.smoker = null;
}

function clearForm() {
  document.getElementsByName("age")[0].value = ""
  document.getElementsByName("rel")[0].value = ""
  document.getElementsByName("smoker")[0].checked = false
}

Person.prototype.getFormAge = function() {
  var formAge = document.getElementsByName("age")[0].value;
  if(isFormFieldFilledIn(formAge, "Age")) {
    if(isAgeFormFieldValid(formAge)) {
      this.age = parseInt(formAge)
    }
  }
}

function isFormFieldFilledIn(fieldValue, fieldName) {
  if(fieldValue == "") {
    window.alert(fieldName + " is required.")
    return false
  }else{
    return true
  }
}

function isAgeFormFieldValid(formAge) {
  if(isNaN(parseInt(formAge))) {
    window.alert("Age must be a number.")
    return false
  }else if(parseInt(formAge) < 1) {
    window.alert("Age must be greater than 0.")
    return false
  }else{
    return true
  }
}

Person.prototype.getFormRelationship = function() {
  var formRel = document.getElementsByName("rel")[0].value;
  if(isFormFieldFilledIn(formRel, "Relationship")) {
    this.relationship = formRel
  }
}

Person.prototype.getFormSmoker = function() {
  var formSmoker = document.getElementsByName("smoker")[0].checked
  this.smoker = formSmoker
}

Person.prototype.addPersonOnTable = function() {
  if(this.age != null && this.relationship != null) {
    var table = document.getElementById("members");
    var personTableRow = this.buildTableRow();
    table.appendChild(personTableRow);
  }
}

Person.prototype.buildTableRow = function() {
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var nodeAge = document.createTextNode(this.age);
  var nodeRel = document.createTextNode(this.relationship);
  var nodeSmoker = document.createTextNode(this.smoker);
  var button = document.createElement("button");
  button.innerHTML = "Remove";
  button.setAttribute("class", "remove");
  td1.appendChild(nodeAge);
  td2.appendChild(nodeRel);
  td3.appendChild(nodeSmoker);
  td4.appendChild(button);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  return tr
}
