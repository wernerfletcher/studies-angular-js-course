(function () {
    'use strict';

    angular.module('ShoppingListApp')
        .service('ShoppingListFilterService', ShoppingListFilterService);

    ShoppingListFilterService.$inject = ['$q', '$timeout'];
    function ShoppingListFilterService($q, $timeout) {
        let service = this;

        service.checkName = function (name) {
            let deferred = $q.defer();

            let result = {
                message: ''
            }

            $timeout(function () {
                if (name.toLowerCase().indexOf('chips') !== -1) {
                    result.message = 'No chips allowed!';
                    deferred.reject(result);
                } else {
                    deferred.resolve(result);
                }
            }, 2000);

            return deferred.promise;
        };

        service.checkQuantity = function (quantity) {
            let deferred = $q.defer();

            let result = {
                message: ''
            }

            $timeout(function () {
                if (quantity > 5) {
                    result.message = 'Too many items!';
                    deferred.reject(result);
                } else {
                    deferred.resolve(result);
                }
            }, 2000);

            return deferred.promise;
        };
    };
})();