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

        let cancelSpinnerListener = $rootScope.$on('shoppingList:toggleSpinner', function (event, data) {
            $ctrl.showSpinner = data.show;
        });
        
        $ctrl.$onDestroy = function () {
            cancelSpinnerListener();
        }
    };
})();