(function () {
    'use strict';

    angular.module('ShoppingListApp')
        .component('shoppingList', {
            templateUrl: 'src/shopping-list/shopping-list.html',
            controller: ShoppingListComponentController,
            bindings: {
                items: '<',
                removeItem: '&'
            }
        });

    ShoppingListComponentController.$inject = ['$element', '$q', '$rootScope', 'ShoppingListFilterService']
    function ShoppingListComponentController($element, $q, $rootScope, ShoppingListFilterService) {
        let $ctrl = this;

        let totalItems = 0;

        $ctrl.$doCheck = function () {
            if ($ctrl.items.length !== totalItems) {
                $rootScope.$broadcast('shoppingList:toggleSpinner', { show: true });

                totalItems = $ctrl.items.length;

                let promises = [];
                for (let i = 0; i < $ctrl.items.length; i++) {
                    promises.push(ShoppingListFilterService.checkName($ctrl.items[i].name));
                }

                $q.all(promises)
                    .then(function (res) {
                        $element.find('div.error').slideUp(500);
                    })
                    .catch(function (err) {
                        $element.find('div.error').slideDown(500);
                    })
                    .finally(function () {
                        $rootScope.$broadcast('shoppingList:toggleSpinner', { show: false });
                    });
            }
        };

        $ctrl.remove = function (idx) {
            $ctrl.removeItem({ index: idx });
        };
    };
})();