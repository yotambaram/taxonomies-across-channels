class Item {
    constructor(requestId, browseNodeId, numberOfResultAskedFor) {
      this.requestId = requestId;
      this.browseNodeId = browseNodeId;
      this.numberOfResultAskedFor = numberOfResultAskedFor
      this.resultAid = new Array;
    }
    pushToResult  (aid){
      this.resultAid.push(aid)
    }
  }

  module.exports = Item;

 