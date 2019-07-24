// Can only refer to the methods and functions listed in the publicAPI
//Can not refer to the object variables using object.variableName
//Must use functions listed in publicAPI to retrieve them
const {Options} = require('./build/options');

describe("Options Class", function () {


    //Gets an error if the object is created in the beforeEach block
    let options;

    beforeEach(function () {
        options = new Options();
    });

    it("can be initialised", function () {
        expect(typeof options).toEqual("object");
    });


    it("Clear Function returns an empty array", function () {

        options.applyDefaults();
        options.clear();

        let optionsString = options.getOption("nOptTraceClassLoad");

        expect(optionsString).toEqual(undefined);

    });


    //Testing three random fields
    it("Can Parse JSON Properly", function () {

        let defaults = {
            "pxConnectionID": "HZIFXUHZBN51NUATLG3POTUR3I92SFZGR",
            "pyExceptionBreak": "Y",
            "pyUserEventTypesList": "",
            "pxUserRuleSetList" : ""
        }

        let json = JSON.stringify(defaults);

        options.parseValuesFromJSON(json);

        expect(options.getOption("nOptExceptionBreak")).toEqual("Y");
        expect(options.getOption("nOptConnectionId")).toEqual("HZIFXUHZBN51NUATLG3POTUR3I92SFZGR");
    });


    it("Get Option Returns right Option Name", function () {
        options.applyDefaults();

        let optionsString = options.getOption("nOptAbbreviateEvents");

        expect(optionsString).toBe("N");
    });


    it("Query Value equal OptionsArray Value", function () {
        let queryObject = options.getQueryString();

        //optionsString = value at field: jo.pyTraceException;
        let optionsString = options.getOption("nOptTraceException");

        let queryString = queryObject.pzOptTraceException;

        expect(optionsString).toEqual(queryString);

    });
});
