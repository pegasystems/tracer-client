import {Options} from '../src/options'
describe("Options", function() {
    let options: Options;

    beforeEach(function() {
        options = new Options("");
    });

    it("can be initialised", function(){
        expect(typeof options).toEqual("object");
    });
});
