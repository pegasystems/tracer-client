describe("Utils", function() {
  var Utils = require('../src/utils');

  beforeEach(function() {

  });

  it("has a getQueryString function", function(){
    expect(typeof Utils.getQueryString).toEqual("function");
  });

  describe("getQueryString function", function(){
    it("combines an array of parameters into a query", function(){
      args = {
        param1 : "value1",
        param2 : "value2",
        param3 : "value3",
      }
      expect(Utils.getQueryString(args)).toEqual("?param1=value1&param2=value2&param3=value3");
    })
  });
});
