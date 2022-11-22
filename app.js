(function () {
    'use strict';

    angular.module('nameCalculator', [])
        .controller('nameCalculatorController', CalculatorController);

        CalculatorController.$inject = ['$scope', '$filter'];
        function CalculatorController($scope, $filter) {
            $scope.name = '';
            $scope.nameUpper = '';
            $scope.numericNameValue = 0;
            $scope.numericNameValueUpper = 0;
            $scope.displayNumericValue = function () {
                $scope.numericNameValue = calculateNumericValue($scope.name);
            }
            $scope.displayUpperCaseName = function () {
                var upper = $filter('uppercase');
                $scope.nameUpper = upper($scope.name);
                $scope.numericNameValueUpper = calculateNumericValue($scope.nameUpper);
            }
        }

        function calculateNumericValue(name) {
            let value = 0;
            for (let a = 0; a < name.length; a++) {
                value += name.charCodeAt(a);
            }
            return value;
        }
})();