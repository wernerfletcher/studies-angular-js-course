(function () {
    'use strict';

    angular.module('ShoppingListApp')
        .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['ShoppingListFactory', 'items'];
    function ShoppingListController(ShoppingListFactory, items) {
        let list = this;
        let shoppingListService = new ShoppingListFactory();

        list.itemName = '';
        list.itemQuantity = '';
        list.items = items;

        list.addItem = function (name, quantity) {
            shoppingListService.add(name, quantity);
        };

        list.removeItem = function (idx) {
            shoppingListService.remove(idx);
        };
    };
})();