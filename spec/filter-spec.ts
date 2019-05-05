import {Field, Filter, Operator} from '../src/filter';

describe("Filter", function() {
  let filter: Filter;

  beforeEach(function() {
  });

  it("can be initialised", function(){
      filter = new Filter(Field.PAGENAME, Operator.EQUAL,"");
      expect(typeof filter).toEqual("object");
  });

  it("can be initialized using it's constant fields", function(){
      filter = new Filter(Field.THREAD, Operator.EQUAL, "Test");
    expect(filter.getField()).toEqual(Field.THREAD);
    expect(filter.getOperator()).toEqual(Operator.EQUAL);
    expect(filter.getValue()).toEqual("Test");
  });
});
