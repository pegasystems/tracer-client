import {Property} from "./property";
import * as Parser from "xml2js";


export class Page {

    properties: Property[];
    tagList: String[];
    name: string;
    static c: number = 0;


    // Element passed in has primaryPageContent as Top level tag and pagedata as second level tag
    constructor(/*element:string, */element: Element, name: string) {


        this.properties = [];
        this.tagList = [];
        this.name = name;

        try {
            //If page is empty, goes straight to catch block
            if (Object.entries(element).length === 0 && element.constructor === Object) {
                throw "Page passed in is an empty object";
            }

            //Sets pagedata as top level tag, page data contains all information needed
            element = element.getElementsByTagName("pagedata")[0];

            //Passes the entirety of pageData and class level array of properties to the recursive function
            this.getPropertiesFromNode(element, this.properties);

        } catch (e) {
            console.log(e);
            this.name = "No Page Associated";
        }
    }

    /*  public parseFromXML(element: string){
          this.properties = [];
          this.tagList = [];
          this.name = name;

          let traceLog = Parser.parseString(element);


          try {
              //If page is empty, goes straight to catch block
              if (Object.entries(element).length === 0 && element.constructor === Object) {
                  throw "Page passed in is an empty object";
              }

              //Sets pagedata as top level tag, page data contains all information needed
              element = traceLog.pagedata;

              //Passes the entirety of pageData and array of properties to the recursive function
              this.getPropertiesFromNode(element, this.properties);

          } catch (e) {
              console.log(e);
              this.name = "No Page Associated";
          }
      }
      */

    private getPropertiesFromNode(sourceNode, propertyContainer) {
        sourceNode.childNodes.forEach((value: Element, valueChildIndex: number) => {

            //If the child node does not have any data
            if (value === undefined) {
                return;
            }

            //If it is a text node. Between each node in a tracer session, there is a text node with a line break
            //The number for text nodes is 3
            if (value.nodeType == 3) {
                return;
            }

            //If the iterated node from the forEach loop (value) has children (Embedded properties, pages or page lists)
            //Text nodes count as children for nodes when using the children.length property
            // childElementCount disregards the text nodes
            if (value.childElementCount > 0) {

                //Since we know value is a parent, we set its type to "non-scalar"
                let tag = value.tagName;
                let type = "non-scalar";

                //Create a child array to store the children of the current node iteration
                let children: Property[] = [];

                //Iterate over the children of the current top level node (value)
                //Parent -> Child
                for (let i = 0; i < value.childElementCount; i++) {


                    //If the child of the top level node also has a child
                    //Parent -> Child -> Grandchild
                    //Thus the value parameter in the call back function has grandchildren
                    //Recursively call the with the child node as the sourceNode parameter
                    if (value.children[i].childElementCount > 0) {
                        this.getPropertiesFromNode(value.children[i], this.properties);
                    }


                    else {
                        //If the current iteration of the child node isn't a parent (no grandchildren) , then get the textContent of the current child
                        //Splits the textcontents of the child by new line into a type string array. The entire text contents is split into one string in the array
                        //Separations created by the separator \n are parsed by a comma in the single string within the array
                        //Take the contents of the length 1 array and turn it into a string
                        let elementTextContents = String(value.children[i].textContent.split("\n"));
                        let tag = value.children[i].tagName;


                        //Since this child node does not have any children, set the type to "scalar"
                        let type = "scalar";

                        //Create the property with all the appropriate parameters, since this child has no child or grandchildren of value
                        //The children parameter is left as undefined and push this childless child into the children array of the top level node (value)
                        let prop = new Property(elementTextContents, tag, type, undefined);
                        children.push(prop);

                    }
                }


                /* For each implementation of what I wrote above, yields a different result, don't know why
                value.childNodes.forEach((childElement: Element, childElementChildIndex:number )=> {

                     if(childElement.children[childElementChildIndex].childElementCount >0 ){
                         this.getPropertiesFromNode(value.children[childElementChildIndex],this.properties);
                     }


                     let elementTextContents = String(value.children[childElementChildIndex].textContent.split("\n"));
                     let tag = value.children[childElementChildIndex].tagName;


                     let type = "scalar";

                     let prop = new Property(elementTextContents,tag, type, undefined);



                     children.push(prop);

                 });*/


                //This created property is a parent one that contains children and that's why its value is undefined
                let prop = new Property(tag, undefined, type, children);
                propertyContainer.push(prop);
                this.getPropertiesFromNode(value,this.properties);
                return;
            }


            //Childless top level "value" node
            let elementTextContents = value.textContent;
            let tag = value.tagName;
            let type = "scalar";
            let prop = new Property(tag, elementTextContents, type, undefined);

            propertyContainer.push(prop);
        });
    }


    public getPropertyValue(name: string): string {
        let value = "";
        this.properties.forEach(property => {
            if (property.name == name) {
                value = property.value;
            }
        });
        return value;
    }
}

