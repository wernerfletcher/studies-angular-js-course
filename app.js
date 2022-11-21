(function () {
    'use strict';

    angular.module('firstApp', [])
        .controller('firstController', function ($scope) {
            $scope.name = 'Werner';
        });
})();