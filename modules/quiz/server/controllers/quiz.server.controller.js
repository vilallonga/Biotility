'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  QuizQuestion = mongoose.model('QuizQuestion'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a quiz question
 */
exports.create = function(req, res) {

  var question = new QuizQuestion(req.body);

  question.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(question);
    }
  });
};

/*
Retrieve all of the questions by category in quiz_bank
*/
exports.retrieveQuestionsByCategory = function(req, res) {
  QuizQuestion.find({ "category" : req.query.category }).exec(function(err, questions) {
    return res.end(JSON.stringify(questions));
  });
};

/*
Inserts the quiz results to the Student profile
*/
exports.updateScoreByCategory = function(req, res) {
  // var article = req.article;

  // article.title = req.body.title;
  // article.content = req.body.content;


  // user.save(function (err) {
  //     //   if (err) {
  // //     return res.status(400).send({
  // //       message: errorHandler.getErrorMessage(err)
  // //     });
  // //   } else {
  // //     res.json(article);
  // //   }
  // });
};

exports.quizQuestionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Quiz is invalid'
    });
  }

  QuizQuestion.findById(id).populate('user', 'displayName').exec(function(err, quiz) {
    if (err) {
      return next(err);
    } else if (!quiz) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = quiz;
    next();
  });
};
