(function () {
    'use strict';

    angular.module('ShoppingListApp')
        .factory('ShoppingListFactory', ShoppingListFactory);

    ShoppingListFactory.$inject = ['$q', '$timeout'];
    function ShoppingListFactory($q, $timeout) {
        return function () {
            return new ShoppingListService($q, $timeout);
        }
    }

    function ShoppingListService($q, $timeout) {
        let service = this;

        let items = [{ name: 'dummy item', quantity: '3 bags', description: 'this is a dummy item' }];

        service.add = function (name, quantity) {
            items.push({ name: name, quantity: quantity, description: 'Some description of '+name });
        };

        service.remove = function (idx) {
            items.splice(idx, 1);
        };

        service.getItems = function () {
            let deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(items);
            }, 1500);

            return deferred.promise;
        };
    }
})();