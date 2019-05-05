import {Utils} from '../src/utils'
describe("Utils", function() {

  beforeEach(function() {

  });

  it("has a getQueryString function", function(){
    expect(typeof Utils.getQueryString).toEqual("function");
  });

  describe("getQueryString function", function(){
    it("combines an array of parameters into a query", function(){
      let args : any;
      args = {
        param1 : "value1",
        param2 : "value2",
        param3 : "value3",
      }
      expect(Utils.getQueryString(args)).toEqual("?param1=value1&param2=value2&param3=value3");
    })
  });
});
