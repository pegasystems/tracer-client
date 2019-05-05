import {EventsService} from '../src/events-service';

describe("TracerServlet", function() {
  let tracerServlet: EventsService;

  beforeEach(function() {
    tracerServlet = new EventsService("");
  });

  it("can be initialised", function(){
    expect(typeof tracerServlet).toEqual("object");
  });
});
