

async function processTimeout(toDo){
    return toDo            
  }   





  function processTimeout2 (fn, par, time) {
    return new Promise((resolve) => {
      // wait 3s before calling fn(par)
      setTimeout(() => resolve(fn(par)), time)
    })
  }

  module.exports.processTimeout = processTimeout;

  module.exports.processTimeout2 = processTimeout2;