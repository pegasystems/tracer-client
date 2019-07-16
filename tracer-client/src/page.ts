export class Page {

    properties: any;
    tagList: any;
    name: string;



    //Should Page class have static array of pages?
    //How else will the getPage method in Pageservices work?


    // Element passed in has primaryPageContent as Top level tag and pagedata as second level tag

    constructor(element: Element, name: string) {

        this.properties = {};
        this.tagList = [];
        this.name = name;

        try {
            //Once any exception is thrown, control passed to catch block immediately
            if (Object.entries(element).length === 0 && element.constructor === Object)
                throw "Page passed in is an empty object"

            //Sets pagedata as top level tag, page data contains all information needed
            element = element.getElementsByTagName("pagedata")[0];

            //For each child tag in primary pagedata tag
            element.childNodes.forEach((value: Element, index: number) => {

                //If the child node does not have any data, this statement is not being hit so far
                if (value === undefined) {
                    debugger;
                }

                //TextContent is considered the child of a tag/node
                //The "text" childNodes of element don't have any children.
                if (value.childNodes.length === 0) {
                    return;
                }

                //If empty, textContent still returns a string with only whitespace
                let elementTextContents = value.textContent;


                //Checks to see if empty string with only whitespaces
                if (!/\S/.test(elementTextContents)) {
                    elementTextContents = "Could not find any Elements";
                }


                let tag = value.tagName;

                this.tagList.push(tag);
                this.properties[tag] = elementTextContents;
            });
        } catch (e) {
            console.log(e);
            this.name = "No Page Associated";
        }
    }


    public getPropertyValue(name: string): string {
        return this.properties[name];
    }
}
