'use strict';


//controler for teacher page retrieval of students
angular.module('users').controller('StudentLookupController', ['$scope', '$state', '$location', '$filter', 'Users', 
    function($scope, $state, $location, $filter, Users) {
  
        $scope.find = function() {
         $scope.users = Users.query();
        };




    }
]);
