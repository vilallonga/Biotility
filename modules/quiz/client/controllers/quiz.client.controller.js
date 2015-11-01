'use strict';

// Articles controller
angular.module('quiz').controller('QuizController', ['$scope', 
  function ($scope) {
    // This provides Authentication context.
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
  }//End of function for controller
]);

angular.module('quiz').controller('QuizCreate', ['$scope', 'QuizQuestion',
  function ($scope, QuizQuestion) {  
    $scope.showContent = function($fileContent){
        //console.log("Show content");
        var fileText = $fileContent;
        //console.log(fileText);

        var rows = fileText.split('\n');
        var obj = [];
        angular.forEach(rows, function(val) {
          var o = val.split(',');
          if (o[0] !== 'Category') { //sketchy way to get rid of first row
            console.log("O is" + o[0] + o[1]);
            var quizQuestion = new QuizQuestion({
              description: o[2],
              type: o[0],
              answerDesc1: o[4],
              answerDesc2: o[5],
              correctAnswer: o[3]
            });

            quizQuestion.$save(function (response) {
              console.log("save done");
            }, function (errorResponse) {
              console.log("Error occured" + errorResponse.data.message);
            });
          }
        });
        
        $scope.content = obj;
        //console.log(obj);
    };
  }
]);

