const { Options } = require('./build/options');
describe("Options", function() {
    let options;

    beforeEach(function() {
        options = new Options("");
    });

    it("can be initialised", function(){
        expect(typeof options).toEqual("object");
    });
});
