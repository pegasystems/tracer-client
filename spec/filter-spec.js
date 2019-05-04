describe("Filter", function() {
  var Filter = require('../backup/filter');
  var filter;

  beforeEach(function() {
    filter = new Filter();
  });

  it("can be initialised", function(){
    expect(typeof filter).toEqual("object");
  });

  it("can be initialized using it's constant fields", function(){
    filter = new Filter(Filter.fields.THREAD, Filter.operators.EQUAL, "Test");
    expect(filter.getField()).toEqual(Filter.fields.THREAD);
    expect(filter.getOperator()).toEqual(Filter.operators.EQUAL);
    expect(filter.getValue()).toEqual("Test");
  });
});
