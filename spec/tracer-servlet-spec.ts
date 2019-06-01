import {EventsServicePega8} from '../src/events-service-pega8';

describe("TracerServlet", function() {
  let tracerServlet: EventsServicePega8;

  beforeEach(function() {
    tracerServlet = new EventsServicePega8("");
  });

  it("can be initialised", function(){
    expect(typeof tracerServlet).toEqual("object");
  });
});
