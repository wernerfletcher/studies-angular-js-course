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
            
            $scope.displayNumericValue = function () {
                $scope.numericNameValue = calculateNumericValue($scope.name);
            };

            $scope.displayUpperCaseName = function () {
                $scope.nameUpper = $filter('uppercase')($scope.name);
                $scope.numericNameValueUpper = calculateNumericValue($scope.nameUpper);
            };

            $scope.buttonSelected = false;
            $scope.iconPrefix = 'off';
            $scope.changeButtonState = function () {
                $scope.buttonSelected = !$scope.buttonSelected;
                $scope.iconPrefix = setIconPrefix($scope.buttonSelected);
            };

            $scope.price = 0;
            $scope.generateRandomPrice = function () {
                if ($scope.iconPrefix == 'off') {
                    $scope.price = 0;
                } else {
                    $scope.price = Math.random()*1000;
                }
            };
        }

        function setIconPrefix(buttonSelected) {
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