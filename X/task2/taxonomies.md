#Task 2- Building Algopix taxonomies mapping table across channels

 
Overview

Algopix supports three of the largest marketplaces that exist today- Amazon,eBay and Walmart in different countries.

Our goal is to help marketplaces grow their business and in order to do so, one of the use-cases we support is “Category Gap Analysis” which means:  
looking into two categories that has the same type of products, when the given input is the category that I would like to examine and the category that I would like to test against- what would be the products that exist in category B and does not exist in category A. 

For making an “Apple to Apple” comparison, we need to make sure that the categories we are looking into and comparing to each other- does actually refer to the same group of products.

User Story we should support
As a user, for either Amazon/Walmart/eBay Category ID I would like to receive- all of the equivalents categories in the other marketplaces so I would be able to run Category Gap analysis and make an “Apple to Apple” comparison. 
As an example-
I would look for this category ID: 2975359011 (Dog Food, Amazon US) and to receive the following as a response:

Channel
Category ID
Name
Match Type
eBay US
66780
Dog Food
EXACT*
Walmart US
6432755
Dog Food
EXACT*


Match type, and how we build taxonomy rules exists in this document.


There are two possible ways of implementing taxonomy matching:


Using Category Research API-> Product Analysis API
Running all 20K Amazon categories through the Category Research API (Documentation- 
For each category, run all of its ASINs in the Product Analysis API with requests for AMAZON_US, WALMART_US and EBAY_US offers.
Complete list of AMAZON_US categories exists here

Follow the categories that are being retrieved for each product and try to map by those. As an example, let’s take the watches category from Amazon (ID: 6358540011).
Assuming we ran that through the category API, and received a single  - B000GB1R7S
We ran it through Product Analysis asking for AMAZON_US,EBAY_US,WALMART_US
We have received the following categories for this ASIN: 
			
			AMAZON:
			        "name": "Wrist Watches",
                            "id": "6358540011",
			EBAY:
				 "name": "Wristwatches",
                            "id": "31387",
			WALMART:
			        "name": "Everyday Watches",
                            "id": "2242838",


In this case, and due to fact that the category we ran contains a single product in this example, the mapping table would look like this for this category (6358540011)

Channel
Category ID
Name
Match Type
eBay US
31387
Wristwatches
EXACT*
Walmart US
2242838
Everyday Watches
EXACT*

Using our Product Repo by connecting to our DB
