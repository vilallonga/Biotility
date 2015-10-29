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

angular.module('quiz').controller('QuizCreate', ['$scope', 'Quiz',
  function ($scope, Quiz) {
    $scope.createQuizObject = function() { 
      var quizQuestion = new Quiz({
        description: this.description,
        type: this.type,
        answerDesc1: this.answer1,
        answerDesc2: this.answer2
      });
    };
  
    $scope.showContent = function($fileContent){
        console.log("Show content");
        $scope.content = $fileContent;
    };
  }
]);

//angular.module('quiz').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Quiz',
  

  // function ($scope, $stateParams, $location, Authentication, Articles) {
  //   $scope.authentication = Authentication;

  //   // Create new Article
    // $scope.create = function (isValid) {
    //   $scope.error = null;

    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'articleForm');

    //     return false;
    //   }

    //   // Create new Article object
    //   var article = new Articles({
    //     title: this.title,
    //     content: this.content
    //   });

  //     // Redirect after save
  //     article.$save(function (response) {
  //       $location.path('articles/' + response._id);

  //       // Clear form fields
  //       $scope.title = '';
  //       $scope.content = '';
  //     }, function (errorResponse) {
  //       $scope.error = errorResponse.data.message;
  //     });
  //   };

  //   // Remove existing Article
  //   $scope.remove = function (article) {
  //     if (article) {
  //       article.$remove();

  //       for (var i in $scope.articles) {
  //         if ($scope.articles[i] === article) {
  //           $scope.articles.splice(i, 1);
  //         }
  //       }
  //     } else {
  //       $scope.article.$remove(function () {
  //         $location.path('articles');
  //       });
  //     }
  //   };

  //   // Update existing Article
  //   $scope.update = function (isValid) {
  //     $scope.error = null;

  //     if (!isValid) {
  //       $scope.$broadcast('show-errors-check-validity', 'articleForm');

  //       return false;
  //     }

  //     var article = $scope.article;

  //     article.$update(function () {
  //       $location.path('articles/' + article._id);
  //     }, function (errorResponse) {
  //       $scope.error = errorResponse.data.message;
  //     });
  //   };

  //   // Find a list of Articles
  //   $scope.find = function () {
  //     $scope.articles = Articles.query();
  //   };

  //   // Find existing Article
  //   $scope.findOne = function () {
  //     $scope.article = Articles.get({
  //       articleId: $stateParams.articleId
  //     });
  //   };
  // }
//]);
