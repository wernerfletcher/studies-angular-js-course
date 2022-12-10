(function () {
    'use strict';

    angular.module('ShoppingListApp')
        .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
        let list = this;
        let shoppingListService = new ShoppingListFactory(5);

        list.itemName = '';
        list.itemQuantity = '';
        list.items = shoppingListService.getItems();

        list.addItem = function (name, quantity) {
            shoppingListService.add(name, quantity);
        };

        list.removeItem = function (idx) {
            shoppingListService.remove(idx);
        };
    };
})();