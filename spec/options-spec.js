// Can only refer to the methods and functions listed in the publicAPI
//Can not refer to the object variables using object.variableName
//Must use functions listed in publicAPI to retrieve them
const {Options} = require('./build/options');

describe("Options Class", function () {



    let filter;

    beforeEach(function () {
        options = new Options();
    });

    it("can be initialised", function () {
        expect(typeof options).toEqual("object");
    });


    //Needs to be fixed
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
        expect(options.getOption("nOptConnectionID")).toEqual("HZIFXUHZBN51NUATLG3POTUR3I92SFZGR");
    });


    it("Get Option Returns right Option Name", function () {
        options.applyDefaults();

        let optionsString = options.getOption("nOptAbbreviateEvents");

        expect(optionsString).toBe("N");
    });


    it("Set Option Returns Right Value", function(){
        options.setOption("TestOption", "True");
        expect(options.getOption("TestOption")).toBe("True");
    });


    it("Gets Correct Keys", function(){
        const keys = options.getKeys();
        expect(keys[2]).toBe("pxConnectionID");
    });

    it("Query Value equal OptionsArray Value", function () {
        let queryObject = options.getQueryString();

        //optionsString = value at field: jo.pyTraceException;
        let optionsString = options.getOption("nOptTraceException");

        let queryString = queryObject.pzOptTraceException;

        expect(optionsString).toEqual(queryString);

    });
});
