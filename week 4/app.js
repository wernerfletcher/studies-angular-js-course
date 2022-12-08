(function () {
    'use strict';

    angular.module('shoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .service('ShoppingListFilterService', ShoppingListFilterService)
        .component('itemList', {
            templateUrl: 'itemList.html',
            controller: ItemListComponentController,
            bindings: {
                listTitle: '@title',
                items: '<',
                removeItem: '&'
            }
        })
        .component('spinner', {
            templateUrl: 'spinner.html',
            controller: SpinnerComponentController,
            bindings: {

            }
        });

    SpinnerComponentController.$inject = ['$rootScope'];
    function SpinnerComponentController($rootScope) {
        let $ctrl = this;

        $ctrl.showSpinner = false;

        let cancelListener = $rootScope.$on('shoppinglist:togglespinner', function (event, data) {
            $ctrl.showSpinner = data.show;
        });

        $ctrl.$onDestroy = function () {
            cancelListener();
        };
    }

    ItemListComponentController.$inject = ['$element'];
    function ItemListComponentController($element) {
        let $ctrl = this;

        $ctrl.checkItem = function () {
            for (let i = 0; i < $ctrl.items.length; i++) {
                if ($ctrl.items[i].name.toLowerCase().indexOf('chips') !== -1) {
                    return true;
                }
            }
            return false;
        };

        $ctrl.remove = function (idx) {
            $ctrl.removeItem({ index: idx });
        };

        // $ctrl.$onInit = function () {
        // };

        // $ctrl.$onChanges = function () {
        // };

        $ctrl.$doCheck = function () {
            if ($ctrl.checkItem() === true) {
                $element.find('h3.error').slideDown(800);
            } else {
                $element.find('h3.error').slideUp(800);
            }
        };
    }

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
        let shoppingList = this;

        shoppingList.items = ShoppingListService.getItems();
        shoppingList.itemName = '';
        shoppingList.itemQuantity = '';
        shoppingList.errorMessage = '';
        shoppingList.title = 'Shopping List:';

        shoppingList.addItem = function () {
            ShoppingListService.addItem(shoppingList.itemName, shoppingList.itemQuantity);
        };

        shoppingList.removeItem = function (index) {
            ShoppingListService.removeItem(index);
        };
    };

    ShoppingListService.$inject = ['ShoppingListFilterService', '$q', '$rootScope'];
    function ShoppingListService(ShoppingListFilterService, $q, $rootScope) {
        let service = this;

        let items = [];

        service.addItem = function (itemName, itemQuantity) {
            $rootScope.$broadcast('shoppinglist:togglespinner', { show: true });

            items.push({ name: itemName, quantity: itemQuantity });

            $q.all([
                ShoppingListFilterService.checkItemName(itemName),
                ShoppingListFilterService.checkItemQuantity(itemQuantity)
            ])
                .catch(function (error) {
                    console.error(error.message);
                })
                .finally(function () {
                    $rootScope.$broadcast('shoppinglist:togglespinner', { show: false });
                });
        };

        service.removeItem = function (index) {
            items.splice(index, 1);
        };

        service.getItems = function () {
            return items;
        };
    };

    ShoppingListFilterService.$inject = ['$q', '$timeout'];
    function ShoppingListFilterService($q, $timeout) {
        let service = this;

        service.checkItemName = function (name) {
            let deferred = $q.defer();

            let result = {
                message: ''
            };

            $timeout(function () {
                if (name.toLowerCase().indexOf('chips') !== -1) {
                    result.message = 'Not allowed to order that item!';
                    deferred.reject(result);
                } else {
                    deferred.resolve(result);
                }
            }, 3000);

            return deferred.promise;
        };

        service.checkItemQuantity = function (quantity) {
            let deferred = $q.defer();

            let result = {
                message: ''
            };

            $timeout(function () {
                if (quantity > 5) {
                    result.message = 'Not allowed to order that many items!';
                    deferred.reject(result);
                } else {
                    deferred.resolve(result);
                }
            }, 2000);

            return deferred.promise;
        };
    };
})();