'use strict';

// Articles controller
angular.module('quiz').controller('QuizController', ['$scope', 'QuizQuestion',
  function ($scope, QuizQuestion) {
    $scope.isDone = false;
    $scope.questions = {};
    var max = null;
    $scope.isMultipleChoice = false;
    $scope.index = 0;
    $scope.score = 0;
    $scope.numQuestion = $scope.index + 1;

    $scope.submitForm = function () {
      alert($scope.answer);
    };

    $scope.increment = function(answer) { 
      //Checks if last question was reached
      console.log($scope.questions);
      max = $scope.questions.length - 1;// (Index of array starts as 0)
      console.log("Max is " + max);
      console.log("Index is " + $scope.index);
      if ($scope.index === max) {
        console.log("Done");
        $scope.isDone = true;
      }
      //Checking the answer of the question
      console.log("Answer is " + answer);
      console.log("Actual answer is " + $scope.questions[$scope.index].correctAnswer);
      if ($scope.questions[$scope.index].correctAnswer === answer) { 
        $scope.score++;
      }


      //Preparing next question
      $scope.index = ($scope.index + 1) % $scope.questions.length;

      if ( $scope.questions[$scope.index].questionType === "TF" ) {
        $scope.isMultipleChoice = false;
      }else {
        $scope.isMultipleChoice = true;
      }
      $scope.numQuestion++;
    };

    $scope.getQuestion = function () {
      $scope.questions = QuizQuestion.getQuestions();
      console.log($scope.questions);
      if ($scope.questions.questionType === "TF") {
        $scope.isMultipleChoice = false;
      }
      max = $scope.questions.length;
      console.log(max);
    };

  }//End of function for controller
]);

angular.module('quiz').controller('QuizResults', ['$scope', '$stateParams',
  function ($scope, $stateParams) {
    console.log("Hello state parm");
    console.log($stateParams.correctScore);
    $scope.score = $stateParams.correctScore;
  }
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

