'use strict';

/**
 * Module dependencies.
 */
var quiz = require('../controllers/quiz.server.controller');
//var user = require('/user/server/controllers/users.authentication.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/quiz')
    .post(quiz.create);

  app.route('/api/quiz/')
  	.get(quiz.retrieveQuestionsByCategory);

  app.route('/api/quiz_result')
  	.put(quiz.updateScoreByCategory);

  app.param('quizID', quiz.quizQuestionByID);
};
