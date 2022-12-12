(function () {
    'use strict';

    angular.module('ShoppingListApp', ['Spinner', 'ui.router']);

    angular.module('ShoppingListApp')
        .run(function () {
            console.log('ShoppingListApp module run method');
        });
})();