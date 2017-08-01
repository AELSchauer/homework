import fetch from "../util/fetch-fill";
import URI from "urijs";


// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...

function retrieve(options = {}) {
  var request = new Request(options)
  fetch(request.uri()).then(function(response){
    return response.json()
  }).then(function(results) {
    console.log(options);
    request.setResults(results)
    console.log(request.nextPage);
    return results
  }).catch(function(error) {
    console.log(error)
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

Request.prototype.setResults = function(resultsJSON) {
  this.results = resultsJSON;
  this.getNextPage();
  this.getPreviousPage();
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
  }else if(this.results.length < 11) {
    this.nextPage = null
  }else{
    this.nextPage = this.page + 1
  }
}


export default retrieve;
