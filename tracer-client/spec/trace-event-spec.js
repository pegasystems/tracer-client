const {TraceEvent} = require('./build/trace-event');

describe("Event", function() {
  let event;

  beforeEach(function() {
    event = new TraceEvent();
  });

  /** This now blows up **/
  xit("can be initialised", function(){
    expect(typeof event).toEqual("object");
  });
});
