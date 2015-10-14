'use strict';

angular.module('core').controller('MainController', ['$scope', '$state', 'Authentication',
  function ($scope, $state, Authentication) {
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

    $scope.onClicked = function(){
       $state.go('quizpicker');

    };

  }
]);
angular.module('core').controller('QuizController', ['$scope','Authentication',
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
      if ($scope.index == max) {
        console.log("Done");
        $scope.isDone = true;
      }
      $scope.index = ($scope.index + 1) % $scope.arr.length;
      console.log($scope.index);
    };


  }
]);
angular.module('core').controller('QuizResults', ['$scope','Authentication',
    function ($scope, Authentication) {

    }
]);

angular.module('core').controller('QuizPickerController', ['$scope', '$state', 'Authentication',
  function ($scope, $state, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.breadcrum = $state.current.name;
    

  }
]);


