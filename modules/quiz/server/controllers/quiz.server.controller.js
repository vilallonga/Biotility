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
exports.create = function (req, res) {
   console.log("Mongoose create");

  var question = new QuizQuestion(req.body);
  
  question.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(question);
    }
  });
};
exports.list = function (req, res) {
  console.log("Mongoose list");
  QuizQuestion.find( {}, 
    function(err, quizCount) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }else {
        var data = {};
        data = quizCount;
        res.json(data);
      }
    });
};

exports.quizQuestionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Quiz is invalid'
    });
  }

  QuizQuestion.findById(id).populate('user', 'displayName').exec(function (err, quiz) {
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
