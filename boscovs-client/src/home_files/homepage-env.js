//note this file should manually be placed on the web server at /BoscovsOnlineStore/js

//the value should be "dev" for development, "qa" for test and "prod" for production
tealiumEnvironment = "prod";

//the value should be "boscov.resultsdemo.com" for dev, "boscov.resultsdemo.com" for test and "boscov.resultspage.com" for production. does not work in local dev environment
sliEnvironment = "boscov.resultspage.com";

//the value should be "/shop" for all environments.
storeContextPrefix = "/shop";
//the value should be for "https://wwwd.boscov.com/shop" for dev, "https://wwwt.boscovs.com/shop" for test, and "https://boscovs.com/shop" for production.
secureStoreContextPrefix = "https://boscovs.com/shop";
//the value should be "https://wwwd.boscovs.com/store/content" for dev, "https://wwwt.boscovs.com/store/content" for test, and "https://www.boscovs.com/store/content" for production.
storeContentPrefix = "https://www.boscovs.com/store/content";
//the value should be "https://wwwd.boscovs.com/wcsstore/boscovs" for dev, "https://wwwt.boscovs.com/wcsstore/boscovs" for test, and "https://www.boscovs.com/wcsstore/boscovs" for production.
staticHttpContentPrefix = "https://www.boscovs.com/wcsstore/boscovs";