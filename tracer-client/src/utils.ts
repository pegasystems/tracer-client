//import {getTypeScriptInstance} from "ts-loader/dist/types/instances";
import {match} from "minimatch";

export class Utils {


    static counter: number = 0;

    static match: any;

    static getQueryString(queryParameters: any): string {
        let first = true;
        let queryString = "";
        Object.keys(queryParameters).forEach(name => {
            if (first) {
                queryString += "?";
                first = false;
            } else {
                queryString += "&";
            }
            queryString += name + "=" + queryParameters[name];
        });
        return queryString;
    }

    static getNodeStringValue(data: any, nodeName: string) {

        if (!data) {
            return "";
        }
        let matchingNode = data.getElementsByTagName(nodeName);
        if (matchingNode.length > 0 && matchingNode[0] != undefined) {
            return (matchingNode[0].textContent || matchingNode[0].text || "").trim();
        } else {
            return "";
        }
    }

    static getAttributeValue(node: Element, attrName: string) {
        if (!node) {
            return "";
        }
        let attrNode = node.getAttributeNode(attrName);
        if (attrNode) {
            return attrNode.value;
        } else {
            return "";
        }
    }

    static getNodeIntValue(data: any, nodeName: string) {
        if (!data) {
            return -1;
        }

        let matchingNode = data.getElementsByTagName(nodeName);
        if (matchingNode.length > 0 && matchingNode[0] != undefined) {
            let stringVal = (matchingNode[0].textContent || matchingNode[0].text || "").trim();
            try {
                return parseInt(stringVal);
            } catch (e) {
                return -1;
            }
        } else {
            return -1;
        }
    }


    //Latest Commit: Issues/22 7/1/2019
    //I have two class variables, "counter:number" and "match:any". I wanted to see what the structure of MatchingNode[0]
    //looked like since it represents the contents of the primary page
    //So during the first time this method is called, I set the class variable match to the object
    //"matchingNode" that represents the contents of the primary page that is returned by the method
    //"getElementsByTagName"



    static getNodeObjectValue(data: any, nodeName: string) {
        if (!data) {
            return {};
        }


        //MatchingNode is of type HTMLCollection and that is returned

        let matchingNode = data.getElementsByTagName(nodeName);
        if (this.counter === 0)
            this.match = data;
        if (matchingNode.length > 0 && matchingNode[0] != undefined) {
            return matchingNode[0];
        }

        else {
            return {};
        }
        this.counter++;
    }


}
