export class Page {

    //create an associative array similar to one in options class, has names of the properties as index
    //Only have attributes and no methods (POJO)
    properties: any;
    name: string;

    constructor(element: Element) {


        //Have to loop throughout the xml file for each <pageData> node top level only
            //Repeating indexes are childs of the top level page
        this.properties = {};
        //Parse the element and set all values present in the node into the respective indexes for this array
        this.properties["pxObjClass"] = "tenzin test";
        this.name = "s name";


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
