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
            answer_1: "A. ",
            answer_2: "B. "
        },
        {
            q: "What is Genetics?",
            answer_1: "A. ",
            answer_2: "B. "
        },
        {
            q: "What is Chemistry?",
            answer_1: "A. ",
            answer_2: "B. "
        },
        {
            q: "What is Geology?",
            answer_1: "A. ",
            answer_2: "B. "
        }

    ];
    $scope.index = 0;
    $scope.increment = function() { 
      $scope.index = ($scope.index + 1) % $scope.arr.length;
    };


  }
]);

