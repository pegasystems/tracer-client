export class Page {

    //create an associative array similar to one in options class, has names of the properties as index
    //Only have attributes and no methods (POJO) - It now has a method
    properties: any;
    tagList: any;
    name: string;

    static c: number = 0;


    /* Element passed in has primaryPageContent as Top level tag and pagedata as second level tag
        console.log(element);*/
    constructor(element: Element, name: string) {

        this.properties = {};
        this.tagList = [];
        this.name = name;

        //Sets pagedata as top level tag, page data contains all information needed


        element = element.getElementsByTagName("pagedata")[0];

        //For each child tag in primary pagedata tag
        element.childNodes.forEach((value: Element, index: number) => {

            //If the child node does not have any data, this statement is not being hit so far
            if (value === undefined) {
                debugger;
            }

            //TextContent is considered the child of a tag/node
            //The "text" childNodes of element don't have any children, Don't know their values?
          if (value.childNodes.length === 0) {
                return;
            }

            //If the textContent is falsy (null, false, undefined, empty string), return a string
            //Non empty text contents are returned and the default value isn't displayed even though I can't
            //see anything for text content in the console
            //Returned value of empty content exists and is type string

            let elementTextContents = value.textContent;


            let tag = value.tagName;

            this.tagList.push(tag);
            this.properties[tag] = elementTextContents;

             console.log("Tag Value:" + tag + " Text Contents: " + elementTextContents + " Index: " + index + " Type: " + typeof elementTextContents);
        });




        //The 191st page is not of type element and "getElementsByTagName" is not a property. Could be null


        Page.c++;
        console.log(Page.c);


        debugger;
    }


    public getPropertyValue(name: string): string {
        return this.properties[name];
    }
}
