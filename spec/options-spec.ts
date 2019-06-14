import {Options} from '../src/options'
describe("Options", function() {
    let options: Options;

    beforeEach(function() {
        options = new Options("");
    });

    it("can be initialised", function(){
        expect(typeof options).toEqual("object");
    });

    it("Clear Function returns an empty array", function () {

        options.applyDefaults();
        options.clear();

        let optionsString = options.getOption("nOptTraceClassLoad");

        expect(optionsString).toEqual(undefined);

    });

});
