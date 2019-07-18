const {Page} = require('./build/page');
//import * as Parser from "xml2js";
let Parser = require("xml2js");


let xml = "<tracelog><traceEvent><primarypageContent><pagedata><pxObjClass>tenzin</pxObjClass></pagedata></primarypageContent></traceEvent></tracelog>"


describe("Client", function() {
  let page;
  /*let apiContents = [
    "_injectDependencies",
    "start",
    "stop",
    "registerEventCallback",
    "clear",
    "displayTraceEvent",
    "getEventHeader",
  ]*/

  beforeEach(function() {
    page = new Page();
  });
  
  it("has the expected public API", function(){
    // expect(tracer).toHavePublicAPI(apiContents)
  });



  it("supports basic page", function(){


    /*let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(response,"text/xml");

    let element = xmlDoc.getElementsByTagName("tracelog")[0];

    page.parseFromXML(element);*/

    Parser.parseString(xml, function (err, result) {
      console.log(result);
    });


  });
});


//parse top level properties, embedded pages, multiple level of embedded pages, page lists, page groups, value lists, value groups
