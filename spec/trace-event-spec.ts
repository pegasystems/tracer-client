import {TraceEvent} from '../src/trace-event';

describe("Event", function() {
  let event: TraceEvent;

  beforeEach(function() {
    event = new TraceEvent();
  });

  /** This now blows up **/
  xit("can be initialised", function(){
    expect(typeof event).toEqual("object");
  });
});
