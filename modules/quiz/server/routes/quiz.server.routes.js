'use strict';

/**
 * Module dependencies.
 */
var quiz = require('../controllers/quiz.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/quiz')
    .get(quiz.list)
    .post(quiz.create);

  app.param('quizID', quiz.quizQuestionByID);
};
