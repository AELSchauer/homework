document.addEventListener("DOMContentLoaded", function(event) { 
  addButtonClickListener();
  addHouseholdTable();
});

function addButtonClickListener() {
  var addButton = document.getElementsByClassName("add")[0];
  addButton.addEventListener("click", function(event) {
    event.preventDefault();
    processForm();
  });
}

function addHouseholdTable() {
  var submitButton = findSubmitButton();
  var table = createTable();
  submitButton.parentNode.insertBefore(table, submitButton)
}

function createTable() {
  var table = document.createElement("table");
  table.setAttribute("id", "list");
  var th = document.createElement("tr");
  var td1 = document.createElement("th");
  var td2 = document.createElement("th");
  var td3 = document.createElement("th");
  var age = document.createTextNode("Age");
  var rel = document.createTextNode("Relationship");
  var smoker = document.createTextNode("Smoker?");
  td1.appendChild(age);
  td2.appendChild(rel);
  td3.appendChild(smoker);
  th.appendChild(td1);
  th.appendChild(td2);
  th.appendChild(td3);
  table.appendChild(th);
  return table
}

function findSubmitButton() {
  var buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    if(buttons[i].type == 'submit'){
      return buttons[i]
    }
  }
  return []
}

function testMessage() {
  window.alert("Woohoo");
}

function processForm() {
  var person = getFormInfo();
  person.addPersonOnTable();
}

function getFormInfo() {
  var person = new Person();
  person.getFormAge();
  person.getFormRelationship();
  return person
}

function Person() {
  this.age = null;
  this.relationship = null;
  this.smoker = null;
}

Person.prototype.getFormAge = function() {
  var formAge = document.getElementsByName('age')[0].value;
  if(isFormFieldFilledIn(formAge, 'Age')) {
    if(isAgeFormFieldValid(formAge)) {
      this.age = parseInt(formAge)
    }
  }
}

function isFormFieldFilledIn(fieldValue, fieldName) {
  if(fieldValue == '') {
    window.alert(fieldName + ' is required.')
    return false
  }else{
    return true
  }
}

function isAgeFormFieldValid(formAge) {
  if(isNaN(parseInt(formAge))) {
    window.alert('Age must be a number.')
    return false
  }else if(parseInt(formAge) < 1) {
    window.alert('Age must be greater than 0.')
    return false
  }else{
    return true
  }
}

Person.prototype.getFormRelationship = function() {
  var formRel = document.getElementsByName('rel')[0].value;
  if(isFormFieldFilledIn(formRel, 'Relationship')) {
    this.relationship = formRel
  }
}

Person.prototype.addPersonOnTable = function() {
  var table = document.getElementById('list');
  var personTableRow = displayTableRow("10", "Brother", "WEE");
  table.appendChild(personTableRow);
}

function displayTableRow(age, relationship, smoker) {
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var nodeAge = document.createTextNode(age);
  var nodeRel = document.createTextNode(relationship);
  var nodeSmoker = document.createTextNode(smoker);
  td1.appendChild(nodeAge);
  td2.appendChild(nodeRel);
  td3.appendChild(nodeSmoker);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  return tr
}
