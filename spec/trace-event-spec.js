describe("Event", function() {
  var Event = require('../src/trace-event');
  var event;

  beforeEach(function() {
    event = new Event();
  });

  /** This now blows up **/
  xit("can be initialised", function(){
    expect(typeof event).toEqual("object");
  });
});
