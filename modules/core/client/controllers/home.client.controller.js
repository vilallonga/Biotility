'use strict';

/** SEE core.server.routes.js  */

angular.module('core').controller('MainController', ['$scope', '$state', '$location', 'Authentication', 'Subjects',
    function($scope, $state, $location, Authentication, Subjects) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.subjects = Subjects.subjects;

        $scope.gotoQuiz = function(subjectObj) {
            $location.path('/' + subjectObj.name + '/quiz');
        };

        $scope.gotoResource = function(subjectObj) {
            $location.path('/' + subjectObj.name + '/resources');
        };

    }
]);

angular.module('core').controller('SubjectController', ['$scope', '$state', '$location', 'Authentication', '$stateParams',
    function($scope, $state, $location, Authentication, $stateParams) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.subject = $stateParams.courseName;

    }
]);

angular.module('core').controller('ProfileController', ['$scope', '$state', '$location', 'Authentication',
    function ($scope, $state, $location, Authentication) {

        $scope.authentication = Authentication;
        $scope.user = $scope.authentication.user;

        $scope.oneAtATime = true;

        $scope.groups = [
            {
                title: 'Cells',
                content: 'Lesson 4: The Nucleus',
                progress: 60
            },
            {
                title: 'Biology',
                content: 'Lesson 2: Ecosystems',
                progress: 25
            },
            {
                title: 'Chemistry',
                content: 'Lesson 13: Electron Mobility',
                progress: 75
            }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];


        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }
]);

