import {Property} from "./property";
import * as Parser from "xml2js";


export class Page {

    children: Property[];
    name: string;


    // Element passed in has primaryPageContent as Top level tag and pagedata as second level tag
    constructor(name: string, xmlString: string) {
        this.name = name;
        this.children = [];
        let that = this;

        Parser.parseString(xmlString, function (err, result) {
            that.normalizePageDataModel(result, that.children);
        });
    }

    /**
     * @param page is a typeless JS Object which represents a clipboard page
     * @param properties the list to append children on the current page to.
     */
    private normalizePageDataModel(page: any, properties: Property[]) {

        if (!page) {
            return;
        }
        // If there is a top level node called pagedata ignore it.
        if (page.pagedata) {
            page = page.pagedata;
        }


        //Create property and initialize its value with respective property name in page object
        for (let propName in page) {

            let property = page[propName];

            // xml2js adds tags with the name '$'. Treat as attributes but otherwise ignore
            let attributes = (property[0] || {})["$"] || {};

            if (propName == "$") {
                continue;
            }


            if (attributes.REPEATINGTYPE == 'PageList') {

                // TODO This code is almost identical to Page group. Should be refactored.
                let pagelist = new Property(propName, "", "pagelist");
                if (property[0] && property[0].rowdata) {
                    property[0].rowdata.forEach((entry: any, index: number) => {
                        //console.log(entry)
                        let attributes = entry["$"];
                        let pageListEntry = new Property(propName, "", "page", []);
                        pageListEntry.index = attributes.REPEATINGINDEX;
                        this.normalizePageDataModel(entry, pageListEntry.children);
                        pagelist.children.push(pageListEntry)
                    });
                }
                properties.push(pagelist)
            } else if (attributes.REPEATINGTYPE == 'PageGroup') {
                // TODO This code is almost identical to Page list. Should be refactored.
                let pagelist = new Property(propName, "", "pagegroup");
                if (property[0] && property[0].rowdata) {
                    property[0].rowdata.forEach((entry: any, index: number) => {
                        //console.log(entry)
                        let attributes = entry["$"];
                        let pageListEntry = new Property(propName, "", "page", []);
                        pageListEntry.index = attributes.REPEATINGINDEX;
                        this.normalizePageDataModel(entry, pageListEntry.children)
                        pagelist.children.push(pageListEntry)
                    });
                }
                properties.push(pagelist)
            } else if (attributes.REPEATINGTYPE === 'PropertyList') {
                properties.push(new Property(propName, "", "valuelist"))

            } else if (attributes.REPEATINGTYPE === 'PropertyGroup') {
                properties.push(new Property(propName, "", "valuegroup"))

            } else if (typeof property[0] === 'string' && property[0] != "\n") {
                // This is a scalar
                let value = property[0];
                properties.push(new Property(propName, value, "scalar"));
            } else {
                // This is a page
                let page = new Property(propName, "", "page");
                // If this page doesn't have any children, it's one child will be a new line string;
                if (property[0] && typeof property[0] === "object") {
                    this.normalizePageDataModel(property[0], page.children)
                }
                properties.push(page);
            }
        }
    }

    public getPropertyValue(name: string): string {
        let value = "";
        this.children.forEach(child => {
            if (child.name == name) {
                value = child.value;
            }
        });
        return value;
    }
}

