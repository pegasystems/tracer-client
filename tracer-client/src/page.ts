import {Client} from "../../tracer-client/src/client";
import {TraceEvent} from "../../tracer-view-classic/src/app/trace-event";

export class Page {

    //create an associative array similar to one in options class, has names of the properties as index
    properties: any;
    name: string;
    client: Client;


    constructor() {
        this.client.registerEventCallback((event) => {
            let traceEvent = new TraceEvent();

            this.properties = [];

            if (typeof traceEvent.primaryPage !== null) {
                this.name = traceEvent.primaryPageName;
                this.properties[this.name] = traceEvent.primaryPage;
            }
        });


        //if there's page data node
        //look up the pxObjClass
        //Get the pxObjClass working
    }
}
