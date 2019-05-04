module.exports = (function(){

  function getNodeValue(data, nodeName){
    var matchingNode = data.getElementsByTagName(nodeName);
    if(matchingNode.length>0 && matchingNode[0]!= undefined) {
      return (matchingNode[0].textContent || matchingNode[0].text || "").trim();
    } else {
      return "";
    }
  }

  function getQueryString(queryParameters){
    var first = true;
    queryString = "";
    Object.keys(queryParameters).forEach(name=>{
      if(first){
      queryString += "?";
      first = false;
      } else {
        queryString += "&";
      }
      queryString += name+"="+queryParameters[name];
    })
    return queryString;
  }

  var publicAPI = {}
  publicAPI.getNodeValue = getNodeValue;
  publicAPI.getQueryString = getQueryString;
  return publicAPI;
})()