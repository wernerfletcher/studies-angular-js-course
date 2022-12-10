(function () {
    'use strict';

    angular.module('ShoppingListApp')
        .factory('ShoppingListFactory', ShoppingListFactory);

    function ShoppingListFactory() {
        let factory = function (maxItems) {
            return new ShoppingListService(maxItems);
        }
        return factory;
    };

    function ShoppingListService(maxItems) {
        let service = this;

        let items = [];

        service.add = function (name, quantity) {
            if ((maxItems === undefined) || (maxItems !== undefined && items.length < maxItems)) {
                items.push({ name: name, quantity: quantity });
            }
        };

        service.remove = function (idx) {
            items.splice(idx, 1);
        };

        service.getItems = function () {
            return items;
        };
    }
})();