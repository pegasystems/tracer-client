export class Property {

    name: string;
    value: string;
    type: string; // Scalar, page, list, group
    children: Property[];



    //Should Page class have static array of pages?
    //How else will the getPage method in Pageservices work?


    // Element passed in has primaryPageContent as Top level tag and pagedata as second level tag

    constructor() {

    }
}