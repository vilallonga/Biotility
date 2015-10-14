'use strict';

/** SEE core.server.routes.js,  */


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

angular.module('core').controller('SubjectController', ['$scope', '$state', 'Authentication', '$stateParams',
  function ($scope, $state, Authentication, $stateParams) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.breadcrum = $stateParams.courseName;
    

  }
]);
angular.module('core').controller('QuizController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.arr =
    [
        {
            q: "What is biology?",
            a1: "A. is Cool",
            a2: "B. is not cool",
            a3: "C. is kinda cool",
            a4: "D. all of the above"
        },
        {
            q: "What is Genetics?",
            a1: "A. is Cool",
            a2: "B. is not cool",
            a3: "C. is kinda cool",
            a4: "D. all of the above"
        },
        {
            q: "What is Chemistry?",
            a1: "A. is Cool",
            a2: "B. is not cool",
            a3: "C. is kinda cool",
            a4: "D. all of the above"
        },
        {
            q: "What is Geology?",
            a1: "A. is Cool",
            a2: "B. is not cool",
            a3: "C. is kinda cool",
            a4: "D. all of the above"
        }

    ];
    $scope.index = 0;
    $scope.increment = function() { 
      $scope.index = ($scope.index + 1) % $scope.arr.length;
      if ($scope.index === $scope.arr.length - 1) {
        console.log("Max");
      }
      console.log($scope.index);
    };


  }
]);

