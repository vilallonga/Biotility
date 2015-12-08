'use strict';

//controler for teacher page retrieval of students
angular.module('users').controller('StudentListController', ['$rootScope', '$scope', '$state', '$location', '$filter', '$http', 'Authentication',
    function($rootScope, $scope, $state, $location, $filter, $http, Authentication) {
    $scope.$state = $state;
    $scope.authentication = Authentication;
   // $scope.section = null;
    $scope.user = "";
    $scope.email = "";
    $scope.firstname = "";
    $scope.lastname = "";
    $scope.check  = "hello";
   // $scope.name = "username";
        $http.get('/api/data/students/')
        .then(function(response) {

            $scope.data = response.data;
           // console.log($scope.data);
        });


   

   
 	$scope.getName = function(disName) {
           $scope.user = disName.userName;
           console.log("hello");
           console.log($scope.user);
        };
    }
]);

angular.module('users').controller('StudentGetController', ['$rootScope', '$scope', '$state', '$stateParams', '$location', '$filter', '$http', 'Authentication',
    function($rootScope, $scope, $state, $stateParams, $location, $filter, $http, Authentication) {
   
    $scope.authentication = Authentication;
   // $scope.section = null;
    $scope.user = $stateParams.username;
    $scope.email = $stateParams.email;
    $scope.firstname = $stateParams.firstname;
    $scope.lastname = $stateParams.lastname;


   

   
 	
    }
]);



   


