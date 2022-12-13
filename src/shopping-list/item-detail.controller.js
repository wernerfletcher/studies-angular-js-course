(function () {
    'use strict';

    angular.module('ShoppingListApp')
        .controller('ItemDetailController', ItemDetailController);

    ItemDetailController.$inject = ['$stateParams', 'items'];
    function ItemDetailController($stateParams, items) {
        let itemDetail = this;

        itemDetail.description = items[$stateParams.itemId].description;
    }
})();