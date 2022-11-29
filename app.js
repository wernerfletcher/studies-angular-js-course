(function () {
    'use strict';

    let petList = ['Dogs', 'Cats', 'Birds', 'Fish', 'Wild dogs', 'Bobcats'];
    let dogList = [
        {
            name: 'Sasha',
            breed: 'Husky'
        },
        {
            name: 'Poochie',
            breed: 'Poodle'
        },
        {
            name: 'Wollie',
            breed: 'Pomeranian'
        }
    ];

    angular.module('nameCalculator', [])
        .controller('nameCalculatorController', calculatorController)
        .controller('todoListController', todoListController)
        .filter('leet', LeetFilterFactory)
        // .service('TodoService', TodoService)
        .factory('TodoServiceFactory', TodoServiceFactory);

    calculatorController.$inject = ['$scope', '$filter', '$timeout', 'leetFilter'];
    function calculatorController($scope, $filter, $timeout) {
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
                $scope.price = Math.random() * 1000;
            }
        };

        $scope.showSurprisePopup = function () {
            $timeout(function () {
                alert('Surprise!!');
            }, 2000);
        };

        $scope.petList = petList;
        $scope.dogList = dogList;
    };

    function setIconPrefix(buttonSelected) {
        return buttonSelected ? 'on' : 'off';
    };

    function calculateNumericValue(name) {
        let value = 0;
        for (let a = 0; a < name.length; a++) {
            value += name.charCodeAt(a);
        }
        return value;
    };

    function LeetFilterFactory() {
        let output = '';
        return function (input, target, replacement) {
            output = input.replaceAll(target, replacement);
            return output;
        }
    };

    todoListController.$inject = ['TodoServiceFactory'];
    function todoListController(TodoServiceFactory) {
        // let todoService = TodoServiceFactory();
        let todoService = TodoServiceFactory(3);
        let todoCtrl = this;

        todoCtrl.itemName = "";
        todoCtrl.itemQuantity = "";
        todoCtrl.items = todoService.getItems();
        todoCtrl.errorMessage = "";

        todoCtrl.addItem = function () {
            try {
                todoService.addItem(todoCtrl.itemName, todoCtrl.itemQuantity);
                todoCtrl.itemName = "";
                todoCtrl.itemQuantity = "";
            } catch (error) {
                todoCtrl.errorMessage = error.message;
            }
        };

        todoCtrl.removeItem = function (index) {
            todoService.removeItem(index);
            todoCtrl.errorMessage = "";
        };
    };

    function TodoService(maxItems) {
        let service = this;
        let todoItems = [];

        service.addItem = function (name, quantity) {
            if (!maxItems || (maxItems && todoItems.length < maxItems)) {
                todoItems.push({ 'name': name, 'quantity': quantity });
            } else {
                throw new Error(`Max item limit of ${maxItems} reached!`);
            }
        };

        service.getItems = function () {
            return todoItems;
        };

        service.removeItem = function (index) {
            todoItems.splice(index, 1);
        };
    };

    function TodoServiceFactory() {
        let factory = function (maxItems) {
            return new TodoService(maxItems);
        };
        return factory;
    };
})();