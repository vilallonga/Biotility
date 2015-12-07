'use strict';

//controler for teacher page retrieval of students
angular.module('users').controller('StudentListController', ['$scope', '$state', '$location', '$filter', '$http',
    function($scope, $state, $location, $filter, $http) {
        $http.get('/api/data/students')
        .then(function(response) {
            $scope.data = response.data;
        });
    }
]);
