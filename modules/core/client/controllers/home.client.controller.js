'use strict';

/** SEE core.server.routes.js  */

angular.module('core').controller('MainController', ['$scope', '$state', '$location', 'Authentication', 'Subjects',
  function ($scope, $state, $location, Authentication, Subjects) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.subjects = Subjects.subjects;

    $scope.onClicked = function(subjectObj) {
        $location.path('/' + subjectObj.name);
    };

  }
]);

angular.module('core').controller('SubjectController', ['$scope', '$state', '$location','Authentication', '$stateParams',
  function ($scope, $state, $location, Authentication, $stateParams) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.subject = $stateParams.courseName;

  }
]);




