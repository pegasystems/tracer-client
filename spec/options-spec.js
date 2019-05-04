describe("Options", function() {
  var Options = require('../backup/options');
  var filter;

  beforeEach(function() {
    options = new Options();
  });

  it("can be initialised", function(){
    expect(typeof options).toEqual("object");
  });
});
