import {Property} from "./property";

export class Page {

    properties: Property[];
    tagList: any;
    name: string;



    //Should Page class have static array of pages?
    //How else will the getPage method in Pageservices work?


    // Element passed in has primaryPageContent as Top level tag and pagedata as second level tag

    constructor(element: Element, name: string) {

        this.properties = [];
        this.tagList = [];
        this.name = name;

        if(name == "pyDisplayHarness"){
            debugger;
        }

        try {
            //Once any exception is thrown, control passed to catch block immediately
            if (Object.entries(element).length === 0 && element.constructor === Object){
                throw "Page passed in is an empty object";
            }

            //Sets pagedata as top level tag, page data contains all information needed
            element = element.getElementsByTagName("pagedata")[0];

            //For each child tag in primary pagedata tag
            this.getPropertiesFromNode(element, this.properties);

        } catch (e) {
            console.log(e);
            this.name = "No Page Associated";
        }
    }

    private getPropertiesFromNode(sourceNode, targetProperty){

        sourceNode.childNodes.forEach((value: Element, index: number) => {
            //If the child node does not have any data, this statement is not being hit so far
            if (value === undefined) {
                debugger;
            }
            //Checks to see if this is a text node
            if (value.nodeType === 3) {
                return;
            }

            // Should not happen, but not supported regardless.
            if (value.childNodes.length == 0){
                return;
            }

            //TextContent is considered the child of a tag/node
            //The "text" childNodes of element don't have any children.
            if (value.childNodes.length > 1) {
                let tag = value.tagName;
                let prop = new Property();
                prop.name = tag;
                this.getPropertiesFromNode(value, prop);
                targetProperty.push(prop);
                return;
            }

            //If empty, textContent still returns a string with only whitespace
            let elementTextContents = value.textContent;
            let tag = value.tagName;
            this.tagList.push(tag);
            let prop = new Property();
            prop.name = tag;
            prop.value = elementTextContents;
            targetProperty.push(prop);
        });
    }

    public getPropertyValue(name: string): string {
        let value = "";
        this.properties.forEach(property=>{
            if(property.name == name){
                value = property.value;
            }
        });
        return value;
    }
}
