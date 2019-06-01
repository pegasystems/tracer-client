
export class Filter {
    constructor(aField: Field, aOperator: Operator, aValue:string){
        this.field = aField;
        this.operator = aOperator;
        this.value = aValue;
    }
    field: Field;
    operator: Operator;
    value: string;
    id: string;
}
export enum Field {
    THREAD,
    RULESET,
    RULESETVERSION,
    PAGENAME
}

export enum Operator {
    EQUAL,
    CONTAINS
}