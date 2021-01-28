class Item {
    constructor(requestId, browseNodeId, numberOfResultAskedFor) {
      this.requestId = requestId;
      this.browseNodeId = browseNodeId;
      this.numberOfResultAskedFor = numberOfResultAskedFor
      this.resultAId = "[]";
    }
    pushToResult  (aid){
      let parsedThisResultAId = JSON.parse(this.resultAId)
      parsedThisResultAId.push(aid)
      let ResultAIdToString = JSON.stringify(parsedThisResultAId)
      this.resultAId = ResultAIdToString
    }
  }

  module.exports = Item;

 