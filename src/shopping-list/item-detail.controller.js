(function () {
    'use strict';

    angular.module('ShoppingListApp')
        .controller('ItemDetailController', ItemDetailController);

    ItemDetailController.$inject = ['selectedItem'];
    function ItemDetailController(selectedItem) {
        let itemDetail = this;

        itemDetail.description = selectedItem.description;
    }
})();