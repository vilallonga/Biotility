'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'PasswordValidator', 'Authentication', 'Subjects',
  function($scope, $state, $http, $location, $window, PasswordValidator, Authentication, Subjects) {

    //Added Stuff
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // credentials object
    $scope.credentials = {};
    $scope.credentials.coursesTeaching = [];

    // array of class names
    $scope.classNames = [];

    // load subjects
    Subjects.loadSubjects().then(function(response) {
      $scope.subjects = response.data;

      // grab all the courses, and read their names.
      for (var i = 0; i < $scope.subjects.length; i++) {
        $scope.classNames.push($scope.subjects[i].name);
      }

    });

    $scope.add = function(course) {
      if (course !== '') {
        $scope.credentials.coursesTeaching.push(course);
      }

      $scope.toAdd = '';
    };

    $scope.signup = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      // Add displayName
      $scope.credentials.displayName = $scope.credentials.lastName + ', ' + $scope.credentials.firstName;

      console.log($scope.credentials);

      $http.post('/api/auth/signup', $scope.credentials).success(function(response) {

        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the home page
        $location.url('/');

      }).error(function(response) {
        console.log("invalid");
        //sets error if invalid info
        setTimeout(function(){ alert("Error: Username already exists/Enter valid information"); }, 0);
        $scope.error = response.message;
        console.log(response);
      });
    };

    $scope.signin = function(isValid) {

      $scope.error = null;

      if (!isValid) {
        //$scope.$broadcast('show-errors-check-validity', 'userForm');
        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function(response) {

        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to home page
        $state.go('home');
      }).error(function(response) {
        console.log("invalid");
        //sets popup for invalid usernmae or password
        setTimeout(function(){ alert("Invalid Username or Password"); }, 0);
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);
