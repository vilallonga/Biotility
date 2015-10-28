'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', 'Subjects',
    function($scope, $state, $http, $location, $window, Authentication, PasswordValidator, Subjects) {

        //Added Stuff
        $scope.authentication = Authentication;
        $scope.popoverMsg = PasswordValidator.getPopoverMsg();

        // Get an eventual error defined in the URL query string:
        $scope.error = $location.search().err;

        // credentials object
        $scope.credentials = {};

        // course to be added
        $scope.toAdd = '';

        $scope.add = function(course) {
            if (course !== '') {
                $scope.credentials.coursesTeaching.push(course);
            }
            $scope.toAdd = '';
        };

        // array of class names
        $scope.classNames = [];

        // grab all the courses, and read their names.
        for (var i = 0; i < Subjects.subjects.length; i++) {
            $scope.classNames.push(Subjects.subjects[i].name);
        }

        // If user is signed in then redirect back home
        if ($scope.authentication.user) {
            $location.path('/');
        }

        $scope.signup = function(isValid) {
            $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');

                return false;
            }

            console.log($scope.credentials);

            $http.post('/api/auth/signup', $scope.credentials).success(function(response) {

                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the home page
                $location.url('/');

            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function(isValid) {

            $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');

                return false;
            }

            $http.post('/api/auth/signin', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;
                //make a dialog pop up box appear notifying the user that they successfully logged in
                
                // And redirect to home page
                $state.go('home');
            }).error(function(response) {
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
