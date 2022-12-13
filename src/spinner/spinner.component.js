(function () {
    'use strict';

    angular.module('Spinner')
        .component('spinner', {
            templateUrl: 'src/spinner/spinner.html',
            controller: SpinnerComponentController
        });

    SpinnerComponentController.$inject = ['$rootScope'];
    function SpinnerComponentController($rootScope) {
        let $ctrl = this;
        $ctrl.showSpinner = false;

        let eventListeners = [];

        $ctrl.$onInit = function () {
            let cancel = $rootScope.$on('shoppingList:toggleSpinner', function (event, data) {
                $ctrl.showSpinner = data.show;
            });
            eventListeners.push(cancel);

            cancel = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
                $ctrl.showSpinner = true;
            });
            eventListeners.push(cancel);

            cancel = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
                $ctrl.showSpinner = false;
            });
            eventListeners.push(cancel);
        }

        $ctrl.$onDestroy = function () {
            eventListeners.forEach(function (cancelEvent) {
                cancelEvent();
            });
        }
    };
})();