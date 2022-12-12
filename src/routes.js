(function () {
    'use strict';

    angular.module('ShoppingListApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('tab1');

        $stateProvider
            .state('tab1', {
                url: '/tab1',
                templateUrl: 'src/shopping-list/tab1.html',
                controller: 'ShoppingListController as list',
                resolve: {
                    items: ['ShoppingListFactory', function (ShoppingListFactory) {
                        let shoppingListService = new ShoppingListFactory();
                        return shoppingListService.getItems();
                    }]
                }
            })
            .state('detail', {
                url: '/detail/{itemId}',
                templateUrl: 'src/shopping-list/detail.html',
                controller: 'ItemDetailController as itemDetail',
                resolve: {
                    selectedItem: ['$stateParams', 'ShoppingListFactory', function ($stateParams, ShoppingListFactory) {
                        let shoppingListService = new ShoppingListFactory();
                        return shoppingListService.getItems()
                            .then(function (items) {
                                return items[$stateParams.itemId];
                            });
                    }]
                }
            })
            .state('tab2', {
                url: '/tab2',
                templateUrl: 'src/shopping-list/tab2.html'
            });
    }
})();