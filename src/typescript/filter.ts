
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

    getField(): Field{
        return this.field;
    }
    getOperator(): Operator{
        return this.operator;
    }
    getValue(): string{
        return this.value;
    }
    getID(): string{
        return this.id;
    }
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