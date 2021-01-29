const statusChecker = (jobsStatusObj) => {
    let requestIdsArr = Object.keys(jobsStatusObj)
    let haveWorkToDo = false;
    requestIdsArr.forEach( job => {
      haveWorkToDo = jobsStatusObj[job].ProgressStatus !== "DONE" || jobsStatusObj[job].jobResultsReadyForFetch !== false ? true : false;
      if (haveWorkToDo) {
        return haveWorkToDo;
      }
    });
    return haveWorkToDo
  }

  module.exports.statusChecker = statusChecker;