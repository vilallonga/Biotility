'use strict';

angular.module('core').controller('MainController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.subjects =
    [
    	{
    		name: "Biology",
    		img: "modules/core/client/img/subject_icons/biology.png",
    		description: "Biology is COOL."
    	},
    	{
    		name: "Genetics",
    		img: "modules/core/client/img/subject_icons/biology.png",
    		description: "Biology is COOL."
    	},
    	{
    		name: "Biotility ftw",
    		img: "modules/core/client/img/subject_icons/biology.png",
    		description: "Biology is COOL."
    	},
    	{
    		name: "Chemistry",
    		img: "modules/core/client/img/subject_icons/biology.png",
    		description: "Biology is COOL."
    	},
    	{
    		name: "Chemistry",
    		img: "modules/core/client/img/subject_icons/biology.png",
    		description: "Biology is COOL."
    	}
    ];

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

