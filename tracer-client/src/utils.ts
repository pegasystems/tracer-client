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

    static getNodeObjectValue(data: any, nodeName: string) {
        if (!data) {
            return {};
        }
        let matchingNode = data.getElementsByTagName(nodeName);

        if(this.counter === 0)
            this.match = matchingNode;


        if (matchingNode.length > 0 && matchingNode[0] != undefined) {
            return matchingNode[0];
        } else {
            return {};
        }


        this.counter++;
    }


}
