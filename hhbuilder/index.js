document.addEventListener("DOMContentLoaded", function(event) {
  addButtonClickListener();
  submitButtonClickListener();
  displayMembersTable();
});

function addButtonClickListener() {
  var addButton = document.getElementsByClassName("add")[0];
  addButton.addEventListener("click", function(event) {
    event.preventDefault();
    processForm();
    clearForm();
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
    }
  });
}

function processForm() {
  var Member = getFormInfo();
  Member.addMemberOnTable();
}

function getFormInfo() {
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

Member.prototype.getFormRelationship = function() {
  var formRel = document.getElementsByName("rel")[0].value;
  if(isFormFieldFilledIn(formRel, "Relationship")) {
    this.relationship = formRel
  }
}

Member.prototype.getFormSmoker = function() {
  var formSmoker = document.getElementsByName("smoker")[0].checked
  this.smoker = formSmoker
}

Member.prototype.addMemberOnTable = function() {
  if(this.age != null && this.relationship != null) {
    var table = document.getElementById("members")
    var tbody = table.getElementsByTagName('tbody')[0];
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
    submitMembers(membersJSON);
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

function submitMembers(bodyJSON) {
  var text = document.createTextNode(bodyJSON);
  var oldDebug = document.getElementsByClassName('debug')[0]
  var newDebug = document.createElement('pre')
  newDebug.setAttribute('class', 'debug')
  newDebug.appendChild(text)
  oldDebug.parentNode.replaceChild(newDebug, oldDebug);
}

function getListOfHouseholdMembersFromTable() {
  var table = document.getElementById("members");
  var tbody = table.getElementsByTagName('tbody')[0];
  var trs = tbody.getElementsByTagName('tr');
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
