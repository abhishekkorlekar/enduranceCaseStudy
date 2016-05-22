/**
 * Created by abhishek on 12/4/16.
 */


angular.module('abhiApp').controller('landingPageController',landingPageController);

landingPageController.$inject = ['$scope','landingPageService','$state'];

function landingPageController($scope,landingPageService,$state) {

    var vm = this;
    vm.searchDoaminName = searchDomainName;
    vm.tldsType = 'com';
    vm.checkDomainNameResult = null;
    vm.preimiumDomainList = [];
    vm.normalDomainBtnVal = "add";
    vm.totalPrice = 0; //total price to be zero at the start
    vm.predicate = "price";
    vm.showSpinner = false;
    vm.reverse = true;
    vm.addPremiumDomainPrice = addPremiumDomainPrice;
    vm.removePremiumDomainPrice = removePremiumDomainPrice;
    vm.order = order;
    vm.clearTotalPrice = clearTotalPrice;






    function searchDomainName(){
     vm.showSpinner = true;
     vm.totalPrice = 0; //total price to be zero when user hits search again
     vm.normalDomainBtnVal = "add"; //changing the value of available domain btn to Add
     vm.displayFullDomainName = vm.domainName + "." + vm.tldsType;
     vm.checkDomainNameResult = null; //to load to table again
     vm.preimiumDomainList = [] //to clear array when user clicks search again so that new values are loaded

     landingPageService.checkDomainName(vm.domainName, vm.tldsType).then(function(){

         var classkey = landingPageService.domainRes["data"][vm.domainName+"."+vm.tldsType]["classkey"];

         landingPageService.getNormalDomainPrice().then(function(){
            vm.checkDomainNameResult = landingPageService.domainRes["data"][vm.domainName+"."+vm.tldsType]["status"];
            vm.normalDomainPriceResult = parseInt(landingPageService.normaldomainResPrice["data"][classkey]["addnewdomain"]["1"]);
            vm.showSpinner = false;
         });
     });


     landingPageService.checkPremiumDomainName(vm.domainName, vm.tldsType).then(function(){
         vm.checkPremiumDomainNameResult = landingPageService.premiumdomainRes["data"];
         for (var x in vm.checkPremiumDomainNameResult){
             var intPrice = parseInt(vm.checkPremiumDomainNameResult[x]);
             vm.preimiumDomainList.push({"preDomain": x, "price": intPrice, "btnVal": "add"});
         }
     });
        $state.go('landingPage.domainInfo');
    }

    function addPremiumDomainPrice(priceVal, domainVal, type){

        if(type === "premium"){
            angular.forEach(vm.preimiumDomainList, function(value, key){
                    if (domainVal === value.preDomain){
                         value.btnVal = "remove";
                    }
            }); //to change button from add to remove inside table
        }
        else {
            console.log("type is normal");
        }
        //var price = parseInt(priceVal);
        vm.totalPrice += priceVal;
    }

    function removePremiumDomainPrice(priceVal,domainVal,type){
        if(type === "premium"){
            angular.forEach(vm.preimiumDomainList, function(value, key){
                if (domainVal === value.preDomain){
                    value.btnVal = "add";
                }
            }); //to change button from remove to add inside table
        }else {
            console.log("type is normal");
        }

       // var price = parseInt(priceVal);
        vm.totalPrice -= priceVal;
    }

    function order(predicate) {
        vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
        vm.predicate = predicate;
    };

    function clearTotalPrice(){
        vm.totalPrice = 0; //clearing the total price value
        vm.normalDomainBtnVal = "add"; //for normal domain button
        angular.forEach(vm.preimiumDomainList, function(value, key){
                value.btnVal = "add";
        }); //to change button from remove to add inside table
    }
}


