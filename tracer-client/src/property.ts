export class Property {

    name: string;
    value: string;
    index: string;
    type: string;
    children: Property[];

    constructor(name: string, value?:string, type?:string, children?: Property[]) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.index = "";
        this.children = children || [];
    }
}
