(function () {
    'use strict';

    angular.module('Spinner', []);

    angular.module('Spinner')
        .config(function () {
            console.log('Spinner module config method');
        })
        .run(function () {
            console.log('Spinner module run method');
        });
})();