// var host = "https://www.example.com"

document.addEventListener("DOMContentLoaded", function(event) {
  updateFormValidations();
  addButtonClickListener();
  submitButtonClickListener();
  displayMembersTable();
  submitButtonEnableDisable();
});

function addButtonClickListener() {
  var addButton = document.getElementsByClassName("add")[0];
  addButton.addEventListener("click", function(event) {
    event.preventDefault();
    processForm();
    clearForm();
    submitButtonEnableDisable();
  });
}

function displayMembersTable() {
  var addButton = document.getElementsByClassName("add")[0];
  var table = createMembersTable();
  addButton.parentNode.insertBefore(table, addButton.nextSibling);
  removeButtonClickListener();
}

function createMembersTable() {
  var table = document.createElement("table");
  table.setAttribute("id", "members");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");
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
  thead.appendChild(tr);
  table.appendChild(thead);
  table.appendChild(tbody);
  return table
}

function removeButtonClickListener() {
  var table = document.getElementById("members");
  table.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.getAttribute("class") == "remove") {
      var tr = event.target.parentNode.parentNode;
      tr.parentNode.removeChild(tr)
      submitButtonEnableDisable();
    }
  });
}

function processForm() {
  if(formValidationsPassed()) {
    var member = getMemberFromForm();
    member.addMemberToTable();
  }
}

function formValidationsPassed() {
  var formAge = isFormFieldFilledIn("age")
  var formRel = isFormFieldFilledIn("rel")
  return formAge && formRel
}

function getMemberFromForm() {
  var member = new Member();
  member.getFormAge();
  member.getFormRelationship();
  member.getFormSmoker();
  return member
}

function Member(age = null, rel = null, smoker = null) {
  this.age = age;
  this.relationship = rel;
  this.smoker = smoker;
}

function clearForm() {
  document.getElementsByName("age")[0].value = ""
  document.getElementsByName("rel")[0].value = ""
  document.getElementsByName("smoker")[0].checked = false
}

Member.prototype.getFormAge = function() {
  var formAge = document.getElementsByName("age")[0].value;
  this.age = formAge
}

function isFormFieldFilledIn(formFieldName) {
  var formElement = document.forms[0][formFieldName]
  if(formElement.value == "") {
    var label = formElement.previousSibling.textContent.trim()
    window.alert(label + " is required.")
    return false
  }else{
    return true
  }
}

Member.prototype.getFormRelationship = function() {
  var formRel = document.getElementsByName("rel")[0].value;
  this.relationship = formRel
}

Member.prototype.getFormSmoker = function() {
  var formSmoker = document.getElementsByName("smoker")[0].checked
  this.smoker = formSmoker
}

Member.prototype.addMemberToTable = function() {
  if(this.age != null && this.relationship != null) {
    var table = document.getElementById("members")
    var tbody = table.getElementsByTagName("tbody")[0];
    var MemberTableRow = this.buildTableRow();
    tbody.appendChild(MemberTableRow);
  }
}

Member.prototype.buildTableRow = function() {
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

function submitButtonClickListener() {
  var submitButton = findSubmitButton();
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    var membersJSON = getMembersJSON();
    postMembersAJAX(membersJSON);
  });
}

function findSubmitButton() {
  var buttons = document.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    if(buttons[i].innerHTML == "submit"){
      return buttons[i]
    }
  }
}

function postMembersAJAX(bodyJSON) {
  var text = document.createTextNode(bodyJSON);
  var oldDebug = document.getElementsByClassName("debug")[0]
  var newDebug = document.createElement("pre")
  newDebug.setAttribute("class", "debug")
  newDebug.appendChild(text)
  oldDebug.parentNode.replaceChild(newDebug, oldDebug);
}

// function postMembersAJAX(bodyJSON) {
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.open("POST", host + "/members");
//   xmlhttp.setRequestHeader("Content-Type", "application/json");
//   xmlhttp.send(bodyJSON);
// }

function getListOfHouseholdMembersFromTable() {
  var table = document.getElementById("members");
  var tbody = table.getElementsByTagName("tbody")[0];
  var trs = tbody.getElementsByTagName("tr");
  var trsArr = [].slice.call(trs);
  var members = trsArr.map(function(tr) {
    var tds = tr.childNodes
    return new Member(tds[0].innerHTML, tds[1].innerHTML, tds[2].innerHTML)
  })
  return members
}

function getMembersJSON() {
  var members = getListOfHouseholdMembersFromTable();
  return JSON.stringify(
    { members: members.map(function(member) {
      return JSON.stringify(member)
    })
  })
}

function isMemberListed() {
  var members = getListOfHouseholdMembersFromTable();
  if(members.length == 0) {
    return false
  }else{
    return true
  }
}

function submitButtonEnableDisable() {
  var submitButton = findSubmitButton();
  if(isMemberListed()) {
    submitButton.disabled = false
  }else{
    submitButton.disabled = true
  }
}

function updateFormValidations() {
  var ageField = document.forms[0]["age"]
  ageField.setAttribute("type", "number")
  ageField.setAttribute("min", 1)
}
