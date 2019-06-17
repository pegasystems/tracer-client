const {Client} = require('./build/client');

describe("Client", function() {
  let tracer;
  let apiContents = [
    "_injectDependencies",
    "start",
    "stop",
    "registerEventCallback",
    "clear",
    "displayTraceEvent",
    "getEventHeader",
  ]
  
  beforeEach(function() {
    tracer = new Client("FILE", "", "");
  });
  
  it("has the expected public API", function(){
    // expect(tracer).toHavePublicAPI(apiContents)
  });
  
  it("can be initialised", function(){
    expect(typeof tracer).toEqual("object");
  });
});
