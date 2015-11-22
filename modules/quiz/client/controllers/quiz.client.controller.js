'use strict';

// Articles controller
angular.module('quiz').controller('QuizController', ['$scope', 'QuizQuestion',
  function ($scope, QuizQuestion) {
    // This provides Authentication context.
    // $scope.arr =
    // [
    //     {
    //         q: "What is biology?",
    //         a1: "A. is Cool",
    //         a2: "B. is not cool",
    //         a3: "C. A natural science concerned with the study of life and living organisms",
    //         a4: "D. all of the above"
    //     },
    //     {
    //         q: "What is Genetics?",
    //         a1: "A. is Cool",
    //         a2: "B. the study of genes, heredity, and genetic variation in living organisms",
    //         a3: "C. is kinda cool",
    //         a4: "D. all of the above"
    //     },
    //     {
    //         q: "What is Chemistry?",
    //         a1: "A. is Cool",
    //         a2: "B. is not cool",
    //         a3: "C. is kinda cool",
    //         a4: "D. the branch of science that deals with the identification of the substances of which matter is composed"
    //     },
    //     {
    //         q: "What is Geology?",
    //         a1: "A. the science that deals with the earth's physical structure and substance",
    //         a2: "B. is not cool",
    //         a3: "C. is kinda cool",
    //         a4: "D. all of the above"
    //     }

    // ];
    $scope.isDone = false;
    $scope.questions = {};
    var max = $scope.questions.length - 1;
    $scope.isMultipleChoice = false;
    $scope.index = 0;

    $scope.increment = function($location) { 
      if ($scope.index === max) {
        console.log("Done");
        $scope.isDone = true;
      }
      if ( $scope.questions[$scope.index].questionType === "TF" ) {
        $scope.isMultipleChoice = false;
      }else {
        $scope.isMultipleChoice = true;
      }
      $scope.index = ($scope.index + 1) % $scope.questions.length;
      console.log($scope.index);
    };



    $scope.getQuestion = function () {
      console.log("Function getQuestion is called");
      $scope.questions = QuizQuestion.getQuestions();
      console.log($scope.questions);
    };
    if ($scope.questions.questionType === "TF") {
      $scope.isMultipleChoice = false;
    }

  }//End of function for controller
]);

angular.module('quiz').controller('QuizCreate', ['$scope', 'QuizQuestion',
  function ($scope, QuizQuestion) {  
    $scope.uploadQuestions = function($fileContent){
        //console.log("Show content");
        var fileText = $fileContent;
        var rows = fileText.split('\n');
        var obj = [];
        angular.forEach(rows, function(val) {
          var o = val.split(',');
          if (o[0] !== 'Category') { //sketchy way to get rid of first row
            //console.log("O is" + o[0] + o[1]);
            var quizQuestion;
            if (o[1] === 'TF') {
              quizQuestion = new QuizQuestion({
                category: o[0],
                questionType: o[1],
                description: o[2],
                correctAnswer: o[3]
              });
            }else {
              quizQuestion = new QuizQuestion({
                category: o[0],
                questionType: o[1],
                description: o[2],
                correctAnswer: o[3],
                answerDesc1: o[4],
                answerDesc2: o[5],
                answerDesc3: o[6],
                answerDesc4: o[7]
              });
            }
            obj = quizQuestion;
            quizQuestion.$save(function (response) {
              console.log("save done");
            }, function (errorResponse) {
              console.log("Error occured" + errorResponse.data.message);
            });
          } //End category if
        });
        
        $scope.content = obj;
    };

  }
]);

