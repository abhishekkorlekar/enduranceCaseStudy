/**
 * Created by abhishek on 12/4/16.
 */

angular.module('abhiApp').config(routesConfigure)

routesConfigure.$inject = ['$stateProvider']

function routesConfigure($stateProvider) {
    $stateProvider.state('landingPage',{
        url: '/landingPage',
        templateUrl: 'partials/landingPage.html',
        controller: 'landingPageController',
        controllerAs: 'vm'
        })
        .state('landingPage.domainInfo',{
            url: '/domainInfo',
            templateUrl: 'partials/domainInfo.html'
        })
}
