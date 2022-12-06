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
        });

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
            $ctrl.removeItem({index: idx});
        };

        $ctrl.$onInit = function () {
        };
        
        $ctrl.$onChanges = function () {
        };

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
            }

            let quantityResult = ShoppingListFilterService.checkItemQuantity(itemQuantity);
            if (quantityResult.message.length > 0) {
                console.error(quantityResult.message);
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