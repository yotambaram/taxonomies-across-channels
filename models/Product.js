class Product {
    constructor(requestId, browseNodeId, numberOfResultAskedFor, resultAid) {
      this.requestId = requestId;
      this.browseNodeId = browseNodeId;
      this.numberOfResultAskedFor = numberOfResultAskedFor
      this.resultAid = resultAid;
    }
    // pushToResult  (aid){
   
    //   let parsedThisResultAId = JSON.parse(this.resultAid)
    //   parsedThisResultAId.push(aid)
    //   let ResultAIdToString = JSON.stringify(parsedThisResultAid)
    //   this.resultAid = ResultAIdToString
    // }
  }

  module.exports = Product;

 