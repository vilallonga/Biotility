'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Fetch subject data from database
  app.route('/api/parse/subjects').get(core.parseSubjects);

  // Fetch user data from database
  app.route('/api/data/users').get(core.parseUsers);

  // Fetch question data from database
  app.route('/api/data/questions').get(core.parseQuestions);

  // Return a 404 for all undefined api, module or lib routes
  // GOES AFTER ALL API CALLS ^^^^
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);
};
