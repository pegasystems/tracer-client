import {Utils} from './utils' ;

export class Page {

    //create an associative array similar to one in options class, has names of the properties as index
    //Only have attributes and no methods (POJO)
    properties: any;
    name: string;

    constructor(element: Element) {


        //Have to loop throughout the xml file for each <pageData> node at the top level only
        //Repeating indexes in the yml file are children of the top level page

        this.properties = {};
        //Parse the element and set all values present in the node into the respective indexes for the properties array




        //Latest Commit: Issues/22 7/1/2019
        //I wanted see what the contents of the element looked like. The object that was passed in is the
            //MatchingNode[0] object returned by "getNodeObjectValue"
                //Research on the Element API has led me to believe that the attributes of the Element type
                    //below in the if conditional will be needed to populate the page properties tab. I also check to see if attributes exist using the ".hasAttributes" method
                        //In the test array, I fill in the indexes of the array with the tags of the "primary page/MatchingNode[0]/Element passed in"
                            //that's supposed to represent the contents of the primary page.
                                //After clicking a step property after serving the angular project
        //The modal that pops up displays all empty objects and a false to imply that the primaryPage has no attributes

        let test: any;

        test = {};


        if (element.getAttributeNames) {
            test[0] = element.attributes;
            test[1] = element.classList;
            test[2] = element.className;
            test[3] = element.getAttributeNames();
            test[4] = element.hasAttributes();

            test[5] = JSON.stringify(Utils.match[0]);
            test[6] = JSON.stringify(Utils.match);
        }


        this.properties["data"] = JSON.stringify(test);
        this.properties["pxObjClass"] = "Tenzin's Test";
        this.name = "";


        /* this.client.registerEventCallback((event) => {
                    let traceEvent = new TraceEvent();

                    this.properties = [];

                    if (typeof traceEvent.primaryPage !== null) {
                        this.name = traceEvent.primaryPageName;
                        this.properties[this.name] = traceEvent.primaryPage;
                    }
                });*/
        //if there's page data node
        //look up the pxObjClass
        //Get the pxObjClass working
    }


    public getPropertyValue(name: string): string {
        return this.properties[name];
    }
}
