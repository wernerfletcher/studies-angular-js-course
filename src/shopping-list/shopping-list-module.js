(function () {
    'use strict';

    angular.module('ShoppingListApp', ['Spinner', 'ui.router']);

    angular.module('ShoppingListApp')
        .config(RoutesConfig)
        .run(function () {
            console.log('ShoppingListApp module run method');
        });

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('tab1');

        $stateProvider
            .state('tab1', {
                url: '/tab1',
                templateUrl: 'src/shopping-list/tab1.html'
            })
            .state('tab2', {
                url: '/tab2',
                templateUrl: 'src/shopping-list/tab2.html'
            });
    }
})();