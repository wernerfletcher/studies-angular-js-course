(function () {
    'use strict';

    angular.module('nameCalculator', [])
        .controller('nameCalculatorController', calculatorController);

        calculatorController.$inject = ['$scope', '$filter'];
        function calculatorController($scope, $filter) {
            $scope.name = '';
            $scope.nameUpper = '';
            $scope.numericNameValue = 0;
            $scope.numericNameValueUpper = 0;
            $scope.buttonSelected = false;
            $scope.iconPrefix = 'off';
            
            $scope.displayNumericValue = function () {
                $scope.numericNameValue = calculateNumericValue($scope.name);
            }

            $scope.displayUpperCaseName = function () {
                var upper = $filter('uppercase');
                $scope.nameUpper = upper($scope.name);
                $scope.numericNameValueUpper = calculateNumericValue($scope.nameUpper);
            }

            $scope.changeButtonState = function () {
                $scope.buttonSelected = !$scope.buttonSelected;
                $scope.iconPrefix = getIconPrefix($scope.buttonSelected);
            }
        }

        function getIconPrefix(buttonSelected) {
            return buttonSelected ? 'on' : 'off';
        }

        function calculateNumericValue(name) {
            let value = 0;
            for (let a = 0; a < name.length; a++) {
                value += name.charCodeAt(a);
            }
            return value;
        }
})();