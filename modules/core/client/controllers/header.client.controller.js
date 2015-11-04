'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$location', 'Authentication', 'NavCrumbs',
    function($scope, $state, $location, Authentication, NavCrumbs) {
        // Expose view variables
        $scope.$state = $state;
        $scope.authentication = Authentication;

        // Array of page changes for breadcrumb recall
        $scope.breadcrumb = NavCrumbs.breadcrumb;

        // On breadcrumb clicked
        $scope.click = function(crumb) {
            $location.url(crumb.url);
        };

        // Go to profile
        $scope.profile = function() {

            console.log($scope.authentication);
            console.log($scope.authentication.userName);

            if ($scope.authentication.IsTeacher) {
                $location.url('/teacher/' + $scope.authentication.userName);
            } else {
                $location.url('/student/' + $scope.authentication.userName);

            }
        };

        $scope.logout = function() {
            $scope.authentication.user = null;
            $location.url('/');
        };

    }
]);
