const {EventsServicePega8} = require('./build/events-service-pega8');

describe("TracerServlet", function() {
  let tracerServlet;

  beforeEach(function() {
    tracerServlet = new EventsServicePega8("");
  });

  it("can be initialised", function(){
    expect(typeof tracerServlet).toEqual("object");
  });
});
