describe("TracerServlet", function() {
  var TracerServlet = require('../src/events-service');
  var tracerServlet;

  beforeEach(function() {
    tracerServlet = new TracerServlet();
  });

  it("can be initialised", function(){
    expect(typeof tracerServlet).toEqual("object");
  });
});
