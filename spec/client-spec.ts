import {Client} from '../src/client';

describe("Client", function() {
  let tracer: Client;
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
    tracer = new Client("");
  });
  
  it("has the expected public API", function(){
    // expect(tracer).toHavePublicAPI(apiContents)
  });
  
  it("can be initialised", function(){
    expect(typeof tracer).toEqual("object");
  });
});
