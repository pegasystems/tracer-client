const {Field, Filter, Operator} = require ('./build/filter');

describe("Filter", function() {
  let filter;

  beforeEach(function() {
  });

  it("can be initialised", function(){
      filter = new Filter(Field.PAGENAME, Operator.EQUAL,"");
      expect(typeof filter).toEqual("object");
  });

  it("can be initialized using it's constant fields", function(){
      filter = new Filter(Field.THREAD, Operator.EQUAL, "Test");
    expect(filter.field).toEqual(Field.THREAD);
    expect(filter.operator).toEqual(Operator.EQUAL);
    expect(filter.value).toEqual("Test");
  });
});
