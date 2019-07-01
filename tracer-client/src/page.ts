 import {Utils} from './utils' ;

export class Page {

    //create an associative array similar to one in options class, has names of the properties as index
    //Only have attributes and no methods (POJO)
    properties: any;
    name: string;

    constructor(element: Element) {


        //Have to loop throughout the xml file for each <pageData> node at the top level only
        //Repeating indexes in the yml file are childs of the top level page

        this.properties = {};
        //Parse the element and set all values present in the node into the respective indexes for the properties array
            //As of right now, the element does not seem to have any attributes and the object returned by the
                //Utils class seems to be empty?????
        let test:any;

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
