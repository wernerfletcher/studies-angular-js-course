(function () {
    'use strict';

    angular.module('nameCalculator', [])
        .controller('nameCalculatorController', function ($scope) {
            $scope.name = '';
            $scope.numericNameValue = 0;
            $scope.displayNumericValue = function () {
                $scope.numericNameValue = calculateNumericValue($scope.name);
            };

            function calculateNumericValue(name) {
                let value = 0;
                for (let a = 0; a < name.length; a++) {
                    value += name.charCodeAt(a);
                }
                return value;
            }
        });
})();