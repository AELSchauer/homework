import fetch from "../util/fetch-fill";
import URI from "urijs";


// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...

function retrieve(options = {}) {
  var request = new Request(options)
  fetch(request.uri()).then(function(response){
    return response.json()
  }).then(function(json) {
    request.formatResults(json)
    console.log(options)
    console.log(request.records)
    console.log('-------------------------')
    return json
  }).catch(function(error) {
    console.log("error")
    return "error"
  });
}

function Request(options) {
  this.page = options["page"];
  this.colors = options["colors"];
}

Request.prototype.uri = function() {
  var uri = URI(window.path)
  uri.addSearch("limit", "11")
  if(this.page != undefined) {
    var offset = (this.page - 1) * 10
    uri.addSearch("offset", offset)
  }
  if(this.colors != undefined) {
    this.colors.forEach(function(color){
      uri.addSearch("color[]", color)
    })
  }
  return uri.toString()
}

Request.prototype.formatResults = function(resultsJSON) {
  this.json = resultsJSON;
  this.getNextPage();
  this.getPreviousPage();
  this.processJsonToRecords();
  // this.getIds();
}

Request.prototype.getPreviousPage = function() {
  if(this.page == undefined || this.page == 1) {
    this.previousPage = null
  }else{
    this.previousPage = this.page - 1
  }
}

Request.prototype.getNextPage = function() {
  if(this.page == undefined) {
    this.nextPage = 2
  }else if(this.json.length < 11) {
    this.nextPage = null
  }else{
    this.nextPage = this.page + 1
  }
}

Request.prototype.processJsonToRecords = function() {
  if(this.json.length > 0) {
    this.records = this.json.splice(0, 10).map(function(record) {
      record["isPrimary"] = isColorPrimary(record["color"])
      return record
    })
  }else{
    this.records = []
  }
}

function isColorPrimary(color) {
  if(['red','yellow','blue'].indexOf(color) >= 0) {
    return true
  }else{
    return false
  }
}

// Request.prototype.getIds = function() {
//   if(this.records.length > 0) {
//     this.ids = this.records.map(function(record) {
//       return record.id
//     })
//   }else{
//     this.ids = []
//   }
// }

export default retrieve;
