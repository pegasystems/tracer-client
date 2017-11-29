describe("Options", function() {
  var Options = require('../src/options');
  var filter;

  beforeEach(function() {
    options = new Options();
  });

  it("can be initialised", function(){
    expect(typeof options).toEqual("object");
  });
});
