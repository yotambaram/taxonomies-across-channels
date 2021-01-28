const { productAnalysisGetReadyResultsApi } = require("../api/product-analysis-ready-api-request");

async function ProductAnalysisGetReadyResults(/*exampleResponsetArr*/) {
    {}
    let counter = 1;
    const resultIDs = [];
    try { 
      //api call
      const allApiCallResults = await productAnalysisGetReadyResultsApi(/*exampleResponsetArr*/);
      const findIDs = () => {
        let offersArr = allApiCallResults[0].data.result[0].result.offers
        //console.log(dataResult)      
        
        for (let i = 0; i < offersArr.length; i++) {
          categoriesArr = offersArr[i].marketSpecificData.amazonCategories;
          
          for (let j = 0; j < categoriesArr.length; j++) {
            //console.log({"id":categoriesArr[j].id, "name": categoriesArr[j].name})
            //console.log(categories[j])
            
          }
        }
       // console.log(allApiCallResults[0].data.result[0].result.offers[0].marketBrand);

      }
      allApiCallResults[0].data.result.length > 0 ? findIDs() : console.log("empty");
      
      
      
      //console.log(allApiCallResults[0].data.result[0].result.offers[0].offers)
      // console.log(allApiCallResults[0].data.result[0].result.offers[1].marketBrand)
      // console.log(allApiCallResults[0].data.result[0].result.offers[2].marketBrand)

    } catch (err) {
      console.log("Error runProcess" + err);
    }
    console.log(resultIDs)
    return resultIDs
  }


  module.exports.ProductAnalysisGetReadyResults = ProductAnalysisGetReadyResults;