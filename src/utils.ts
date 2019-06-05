export class Utils {
    static getQueryString(queryParameters: any): string{
        let first = true;
        let queryString = "";
        Object.keys(queryParameters).forEach(name=>{
            if(first){
                queryString += "?";
                first = false;
            } else {
                queryString += "&";
            }
            queryString += name+"="+queryParameters[name];
        });
        return queryString;
    }

    static getNodeValue(data: any, nodeName: string){
        let matchingNode = data.getElementsByTagName(nodeName);
        if(matchingNode.length>0 && matchingNode[0]!= undefined) {
            return (matchingNode[0].textContent || matchingNode[0].text || "").trim();
        } else {
            return "";
        }
    }

    static getAttributeValue(node: Element, attrName: string){
        let attrNode = node.getAttributeNode(attrName);
        if(attrNode){
            return attrNode.value;
        } else {
            return "";
        }
    }

    static getNodeIntValue(data: any, nodeName: string){
        let matchingNode = data.getElementsByTagName(nodeName);
        if(matchingNode.length>0 && matchingNode[0]!= undefined) {
            let stringVal = (matchingNode[0].textContent || matchingNode[0].text || "").trim();
            try{
                return parseInt(stringVal);
            } catch (e) {
                return -1;
            }
        } else {
            return -1;
        }
    }
}