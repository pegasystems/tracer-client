describe("Client", function() {
  var Tracer = require('../src/client');
  var tracer;
  var apiContents = [
    "_injectDependencies",
    "start",
    "stop",
    "registerEventCallback",
    "clear",
    "displayTraceEvent",
    "getEventHeader",
  ]
  
  beforeEach(function() {
    tracer = new Tracer();
  });
  
  it("has the expected public API", function(){
    expect(tracer).toHavePublicAPI(apiContents)
  });
  
  it("can be initialised", function(){
    expect(typeof tracer).toEqual("object");
  });
});
