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
            a3: "C. A natural science concerned with the study of life and living organisms",
            a4: "D. all of the above"
        },
        {
            q: "What is Genetics?",
            a1: "A. is Cool",
            a2: "B. the study of genes, heredity, and genetic variation in living organisms",
            a3: "C. is kinda cool",
            a4: "D. all of the above"
        },
        {
            q: "What is Chemistry?",
            a1: "A. is Cool",
            a2: "B. is not cool",
            a3: "C. is kinda cool",
            a4: "D. the branch of science that deals with the identification of the substances of which matter is composed"
        },
        {
            q: "What is Geology?",
            a1: "A. the science that deals with the earth's physical structure and substance",
            a2: "B. is not cool",
            a3: "C. is kinda cool",
            a4: "D. all of the above"
        }

    ];
    $scope.isDone = false;
    var max = $scope.arr.length - 1;
    $scope.index = 0;
    $scope.increment = function($location) { 
      if ($scope.index === max) {
        console.log("Done");
        $scope.isDone = true;
      }
      $scope.index = ($scope.index + 1) % $scope.arr.length;
      console.log($scope.index);
    };
  }
]);

angular.module('core').controller('QuizResultsController', ['$scope','Authentication',
    function ($scope, Authentication) {

    }
]);

angular.module('core').controller('ProfileController', ['$scope', '$state', '$location', 'Authentication',
    function ($scope, $state, $location, Authentication) {

        $scope.authentication = Authentication;
        //$scope.user = Authentication.user;
        var user = {
            "firstName": "Michael",
            "lastName": "Vilallonga",
            "email": "mv1@email.com",
            "username": "abc",


        }
        $scope.user = user;
        console.log("\n");
        console.log($scope.user);

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


