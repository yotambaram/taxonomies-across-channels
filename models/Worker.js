class Worker {
    constructor(requestId, categoryId ,numberOfResultAskFor) {
      this.requestId = requestId;
      this.categoryId = categoryId;
      this.numberOfResultAskFor = numberOfResultAskFor;
      this.ProgressStatus = 1 // "recived"
    }

    setStatus (currentStatus){
        this.ProgressStatus = currentStatus
    }
   
  }

  module.exports = Worker;

   /*
     constructor(requestId, categoryId ,numberOfResultAskFor) {
      this.requestId = {"categoryId": categoryId, "numberOfResultAskFor": numberOfResultAskFor, "ProgressStatus": 1};
    }
    */