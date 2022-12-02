(function () {
    'use strict';

    angular.module('shoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .service('ShoppingListFilterService', ShoppingListFilterService)
        .directive('itemList', ItemList);

    function ItemList() {
        let ddo = {
            templateUrl: 'itemList.html',
            restrict: 'E',//restricted to element.  'A' for attribute
            scope: {
                listTitle: '@title',
                items: '<'
            },
            controller: ItemListController,
            controllerAs: 'ctrl',
            bindToController: true,
        };
        return ddo;
    }

    function ItemListController() {
        let ctrl = this;

        ctrl.checkItem = function () {
            for (let i = 0; i < ctrl.items.length; i++) {
                if (ctrl.items[i].name.toLowerCase().indexOf('chips') !== -1) {
                    return true;
                }
            }
            return false;
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
            try {
                ShoppingListService.addItem(shoppingList.itemName, shoppingList.itemQuantity);
            } catch (error) {
                shoppingList.errorMessage = error;
            }
        };

        shoppingList.removeItem = function (index) {
            ShoppingListService.removeItem(index);
        };
    };

    ShoppingListService.$inject = ['ShoppingListFilterService'];
    function ShoppingListService(ShoppingListFilterService) {
        let service = this;

        let items = [];

        service.addItem = function (itemName, itemQuantity) {
            let nameResult = ShoppingListFilterService.checkItemName(itemName);
            if (nameResult.message.length > 0) {
                console.error(nameResult.message);
                //throw new Error(nameResult.message);
            }

            let quantityResult = ShoppingListFilterService.checkItemQuantity(itemQuantity);
            if (quantityResult.message.length > 0) {
                console.error(quantityResult.message);
                //throw new Error(quantityResult.message);
            }

            items.push({name: itemName, quantity: itemQuantity});
        };

        service.removeItem = function (index) {
            items.splice(index, 1);
        };

        service.getItems = function () {
            return items;
        };
    };

    ShoppingListFilterService.$inject = [];
    function ShoppingListFilterService() {
        let service = this;

        service.checkItemName = function (name) {
            let result = {
                message: ''
            };

            if (name.toLowerCase().indexOf('chips') !== -1) {
                result.message = 'Not allowed to order that item!';
            }
            return result;
        };

        service.checkItemQuantity = function (quantity) {
            let result = {
                message: ''
            };

            if (quantity > 5) {
                result.message = 'Not allowed to order that many items!';
            }
            return result;
        };
    };
})();