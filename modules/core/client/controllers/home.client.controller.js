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
