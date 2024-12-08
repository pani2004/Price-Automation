# Price Automation

A web application that fetches and displays product details and prices from various shopping sites. This project is divided into two main parts: the client and the server.

## Prerequisites

Ensure you have the following installed on your machine:
- Node.js and npm
- MongoDB

## Project Structure

The project directory (`price-automation`) contains two main folders:
- `client` - The frontend built with React.
- `server` - The backend built with Node.js and Express.

## Installation Guide

### Step 1: Install Dependencies

Navigate to each folder (`client` and `server`) and install dependencies.

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

### Step 3: Run the Application
Use the following commands to start both the server and client in development mode.

```bash
# Start the server
cd server
npm run dev

# Start the client
cd ../client
npm run dev


// // Select the first product container (adjust the selector based on actual HTML structure)
// const productContainer = document.querySelector(".s-main-slot .s-result-item");

// // Within this container, find the link tag and price
// const linkElement = productContainer ? productContainer.querySelector("a") : null;
// const priceElement = productContainer ? productContainer.querySelector(".a-price .a-offscreen") : null;

cp-price main-product-price pdp-cp-price plp-srp-new-price-outercont

// // Inspect the href of the link tag and price
// if (linkElement) {
//     console.log("Link Href:", linkElement.href);
// } else {
//     console.log("Link element not found in the product container.");
// }

// if (priceElement) {
//     console.log("Price:", priceElement.textContent.trim());
// } else {
//     console.log("Price element not found in the product container.");
 }


{
  "amazon": {
      "url": "https://www.amazon.in/s?k={query}",
      "selectors": {
        "product": ".s-main-slot .s-result-item",  
        "title": "h2 a span",  
        "price": ".a-price .a-offscreen", 
        "link": "h2 a" 
      },
      "website": "amazon"
    },
  
  {
  "ebay": {
    "url": "https://www.ebay.com/sch/i.html?_nkw={query}",
    "selectors": {
      "product": "ul.srp-river-results.clearfix", 
      "title": ".s-item__title",  
      "price": ".s-item__price",  
      "link": ".s-item__link"    
    },
    "website": "ebay"
    },
    "reliance_digital": {
      "url": "https://www.reliancedigital.in/search?q={query}",
      "selectors": {
          "product": "div.pl__container",
          "title": ".sp__name",
          "price": "span.TextWeb__Text-sc-1cyx778-0.gimCrs",
          "link": "a"
      },
      "website": "reliance digital"
    },
    
      "croma":{
        "url":"https://www.croma.com/searchB?q={query}%3Arelevance&text={query}",
        "selectors":{
          "product":".product-list",
          "title":".product-title.plp-prod-title",
          "price":".amount.plp-srp-new-amount",
          "link":"a"
        },
        "website":"croma"
      },
    
    
        "indiamart": {
          "url": "https://dir.indiamart.com/search.mp?ss={query}&v=4&mcatid=&catid=&no_sugg=true&tags=qr_nm:gd|cs:6883|res:RC4|com-cf:nl|ptrs:na|ktp:N0|mc:2300|cat:799|mtp:G|qry_typ:P|lang:en|wc:1",
          "selectors": {
            "product": ".listingCardContainer",
            "title": ".producttitle",
            "price": ".price",
            "link": "a"
          },
          "website": "indiamart"
        },
    "robomart": {
    "url": "https://robomart.com/index.php?route=product/search&search={query}",
    "selectors": {
      "product": ".main-products-wrapper",
      "title": ".name",
      "price": ".price-normal",
      "link": ".name a"
    },
    "website": "robomart"
  },


  headers-

  Indiamart - 
  :authority: dir.indiamart.com
:method: GET
:path: /api/search.rp?q={QUERY}&options.start={START}&search_type={SEARCH_TYPE}&source={SOURCE}&geo_country_info.geo_country_name={COUNTRY_NAME}&geo_country_info.geo_country_code={COUNTRY_CODE}&implicit_info.for_country.type={IMPLICIT_TYPE}&implicit_info.for_country.data={IMPLICIT_DATA}
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br, zstd
accept-language: en-US,en;q=0.6
cache-control: no-cache
cookie: hd_ctval=ctval%3DAll%20India; iploc=gcniso={COUNTRY_CODE}|gcnnm={COUNTRY_NAME}|gctnm={CITY_NAME}|gctid={CITY_ID}|gacrcy=100|gip={IP}|gstnm={STATE_NAME}; sessid=spv=1; site-entry-page=https://www.google.com/; r=g; xnHist=pv%3D3%7Cipv%3D0%7Cfpv%3D0%7Ccity%3D%7Ccvstate%3Dundefined%7Cpopupshown%3Dundefined%7Cinstall%3Dundefined%7Css%3Dundefined%7Cmb%3Dundefined%7Ctm%3Dundefined%7Cage%3Dundefined%7Ccount%3D%7Ctime%3D%7Cglid%3D%7Cgname%3Dundefined%7Cgemail%3Dundefined
pragma: no-cache
priority: u=1, i
referer: https://dir.indiamart.com/search.mp?ss={SEARCH_STRING}&v={VERSION}&mcatid={MCATID}&catid={CATID}&tags={TAGS}
sec-ch-ua: "Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-origin
sec-gpc: 1
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36




serverbasket - 
:authority:
www.serverbasket.com
:method:
GET
:path:
/wp-content/uploads/woos_search_engine_cache/guaven_woos_data.js?v=28.217
:scheme:
https
accept:
application/json, text/javascript, */*; q=0.01
accept-encoding:
gzip, deflate, br, zstd
accept-language:
en-US,en;q=0.6
cache-control:
no-cache
cookie:
PHPSESSID=19e207c6478b0c3ddc20451724ca675d; gws_unid=user_dhw252k1t266; woocommerce_recently_viewed=55214%7C52556
pragma:
no-cache
priority:
u=1, i
referer:
https://www.serverbasket.com/?s=router&post_type=product
sec-ch-ua:
"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"
sec-ch-ua-mobile:
?0
sec-ch-ua-platform:
"Windows"
sec-fetch-dest:
empty
sec-fetch-mode:
cors
sec-fetch-site:
same-origin
sec-gpc:
1
user-agent:
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
x-requested-with:
XMLHttpRequest


Reliance - 
:authority: www.reliancedigital.in
:method: GET
:path: /rildigitalws/v2/rrldigital/cms/pagedata?pageType=productSearchPage&q={QUERY}&page={PAGE}&size={SIZE}&pc=
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br, zstd
accept-language: en-US,en;q=0.5
cache-control: no-cache
content-type: application/json
cookie: HttpOnly; version=4.6.0; AKA_A2=A; citrix_ns_id_.reliancedigital.in_%2F_wat=AAAAAAVTAIIQuNg1Svq9Vss7Fk7gLvwVZzIejVewwYCBlLBZEcUijss1wZETjmwSj-Yw125vmOEQN1CLGwGf_1_DBrXC&
pragma: no-cache
priority: u=1, i
referer: https://www.reliancedigital.in/page/{SEARCH_PAGE}
sec-ch-ua: "Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-origin
sec-gpc: 1
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36


Croma - 
:authority: api.croma.com
:method: GET
:path: /searchservices/v1/search?currentPage={PAGE}&query={QUERY}%3A{SORT}&fields={FIELDS}&channel={CHANNEL}&channelCode={CHANNEL_CODE}&spellOpt={SPELL_OPT}
:scheme: https
accept: application/json, text/plain, */*
accept-encoding: gzip, deflate, br, zstd
accept-language: en-US,en;q=0.6
cache-control: no-cache
httpsagent: [object Object]
origin: https://www.croma.com
pragma: no-cache
priority: u=1, i
referer: https://www.croma.com/
sec-ch-ua: "Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-site
sec-gpc: 1
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36


network device - 
:authority:
www.google.com
:method:
POST
:path:
/shopping/merchantverse/_/MerchantVerse/data/batchexecute?rpcids=WZdYT&source-path=%2Fshopping%2Fmerchantverse%2F&bl=boq_shopping-merchantquality-merchantverse_20241125.07_p0&f.sid=-8145503292494932215&hl=en-US&_reqid=6861&rt=c
:scheme:
https
accept:
*/*
accept-encoding:
gzip, deflate, br, zstd
accept-language:
en-US,en;q=0.6
cache-control:
no-cache
content-length:
138
content-type:
application/x-www-form-urlencoded;charset=UTF-8
cookie:
NID=519=TMQBgGyNq2xCNTAZW2ayiN_oNJ9Pcjs1BeK7iAcUWWCyZXlZDzoB2VGTgYPKed8J2kibVb4FXX4UKFpKxj984xWDT5SXJq9eFnvUkb7VPP4-CUOww4AM0Y3tWNnJmmZdg7m1Wj9ukK0xOJJSrhM58rnq129Rr39bmBSztY1ydNc9dLbl42g
origin:
https://www.google.com
pragma:
no-cache
priority:
u=1, i
referer:
https://www.google.com/
sec-ch-ua:
"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"
sec-ch-ua-mobile:
?0
sec-ch-ua-platform:
"Windows"
sec-fetch-dest:
empty
sec-fetch-mode:
cors
sec-fetch-site:
same-origin
sec-gpc:
1
user-agent:
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
x-same-domain:
1


robomart - 
:authority:
accounts.google.com
:method:
GET
:path:
/gsi/status?client_id=855551147868-8u7lleaq2tn4ucqmsnti2jd0t11rrm42.apps.googleusercontent.com&as=wxL4WhpfaJyqTmG4zOsd7g&has_opted_out_fedcm=false
:scheme:
https
accept:
*/*
accept-encoding:
gzip, deflate, br, zstd
accept-language:
en-US,en;q=0.5
cache-control:
no-cache
origin:
https://robomart.com
pragma:
no-cache
priority:
u=1, i
referer:
https://robomart.com/
sec-ch-ua:
"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"
sec-ch-ua-mobile:
?0
sec-ch-ua-platform:
"Windows"
sec-fetch-dest:
empty
sec-fetch-mode:
cors
sec-fetch-site:
cross-site
sec-gpc:
1
user-agent:
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36