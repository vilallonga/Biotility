'use strict';


angular.module('core').controller('StudentData', ['$scope', '$http',
    function($scope, $http) {
      $http.get('/api/data/students')
      .success(function(res){
      	$scope.data = res;
      });
  }
]);

angular.module('core').controller('TeacherData', ['$scope', '$http',
    function($scope, $http) {
      $http.get('/api/data/teachers')
      .success(function(res){
      	$scope.data = res;
      });
    }
]);