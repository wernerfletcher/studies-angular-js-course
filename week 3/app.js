(function () {
    'use strict';

    angular.module('shoppingList', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .service('ShoppingListVerificationService', ShoppingListVerificationService)
        .directive('listItem', ListItem);

    function ListItem() {
        let ddo = {
            templateUrl: 'listItem.html',
            restrict: 'E',
            scope: {
                someTitle: '=title',
                items: '<',
            },
            controller: DirectiveController,
            controllerAs: 'cont',
            bindToController: true,
        };
        return ddo;
    }

    function DirectiveController() {
        let dir = this;

        dir.checkItem = function () {
            for (let i = 0; i < dir.items.length; i++) {
                if (dir.items[i].name.indexOf('chips') !== -1) {
                    return true;
                }
            }
            return false;
        };
    }

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
        let shopCtrl = this;

        shopCtrl.items = ShoppingListService.getItems();
        shopCtrl.itemName = '';
        shopCtrl.itemQuantity = '';
        shopCtrl.errorMessage = '';
        shopCtrl.title = 'Shopping List';

        shopCtrl.addItem = function () {
            ShoppingListService.addItem(shopCtrl.itemName, shopCtrl.itemQuantity);
        };

        shopCtrl.removeItem = function (index) {
            ShoppingListService.removeItem(index);
        };
    };

    ShoppingListService.$inject = ['$q', 'ShoppingListVerificationService'];
    function ShoppingListService($q, ShoppingListVerificationService) {
        let service = this;

        let items = [];

        service.addItem = function (itemName, itemQuantity) {
            $q.all([
                ShoppingListVerificationService.checkItemName(itemName),
                ShoppingListVerificationService.checkItemQuantity(itemQuantity)
            ])
                .then(function (res) {
                    let newItem = {
                        name: itemName,
                        quantity: itemQuantity
                    };

                    items.push(newItem);
                })
                .catch(function (err) {
                    console.error(err);
                });
        };

        service.removeItem = function (index) {
            items.splice(index, 1);
        };

        service.getItems = function () {
            return items;
        };
    };

    ShoppingListVerificationService.$inject = ['$q', '$timeout'];
    function ShoppingListVerificationService($q, $timeout) {
        let service = this;

        service.checkItemName = function (name) {
            let deferred = $q.defer();
            let result = {
                message: ''
            };

            $timeout(function () {
                if (name.toLowerCase().indexOf('chips') === -1) {
                    deferred.resolve(result);
                } else {
                    result.message = 'Not allowed to order that item!'
                    deferred.reject(result);
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
                if (quantity < 5) {
                    deferred.resolve(result);
                } else {
                    result.message = 'Not allowed to order that many items!';
                    deferred.reject(result);
                }
            }, 1000);

            return deferred.promise;
        };
    };
})();