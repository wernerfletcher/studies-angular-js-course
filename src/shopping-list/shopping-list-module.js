(function () {
    'use strict';

    angular.module('ShoppingListApp', ['Spinner']);

    angular.module('ShoppingListApp')
        .config(function () {
            console.log('ShoppingListApp module config method');
        })
        .run(function () {
            console.log('ShoppingListApp module run method');
    });
})();