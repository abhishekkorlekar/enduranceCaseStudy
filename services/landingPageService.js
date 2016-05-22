/**
 * Created by abhishek on 12/4/16.
 */


angular.module('abhiApp').factory('landingPageService',landingPageService);

landingPageService.$inject = ['$http','CONSTANTS'];

function landingPageService($http,CONSTANTS){
    var service = {
        checkDomainName: checkDomainName,
        checkPremiumDomainName : checkPremiumDomainName,
        getNormalDomainPrice : getNormalDomainPrice
    };

    return service;


    function checkDomainName(domainname, tldstype){
        //var url =  CONSTANTS.apiEndpoint + "backendServices/checkDomainName.php";
        var url =  CONSTANTS.apiEndpoint + "apis/check-domain-name?name="+domainname+"&tldstype="+tldstype;
        //var data = {"name" : domainname, "tldstype": tldstype};
        var config = CONSTANTS.apiHeaders;

        return $http.get(url,config).then(successFn, errorFn);

        function successFn(data){
            service.domainRes = data;
        }

        function errorFn(result){
            console.log("error occurred");
        }
    }

    function getNormalDomainPrice(domainname, tldstype){
        //var url =  CONSTANTS.apiEndpoint + "backendServices/getPricingForProducts.php";
        var url =  CONSTANTS.apiEndpoint + "apis/check-product-priciing";
        var config = CONSTANTS.apiHeaders;

        return $http.get(url,config).then(successFn, errorFn);

        function successFn(data){
            service.normaldomainResPrice = data;
        }

        function errorFn(result){
            console.log("error occurred in getting normal domain price");
        }
    }

    function checkPremiumDomainName(domainname, tldstype){
        //var url =  CONSTANTS.apiEndpoint + "backendServices/checkPremiumDomainName.php";
        var url =  CONSTANTS.apiEndpoint + "apis/check-premium-domain?name="+domainname+"&tldstype="+tldstype;
        //var data = {"name" : domainname, "tldstype": tldstype};
        var config = CONSTANTS.apiHeaders;

        return $http.get(url,config).then(successFn, errorFn);

        function successFn(data){
            service.premiumdomainRes = data;
        }

        function errorFn(data){
            service.errorResponse = data;
            console.log("error occurred in premium domain result");
        }
    }


}