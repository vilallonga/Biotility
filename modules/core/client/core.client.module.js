'use strict';

// Use Applicaion configuration module to register a new module
//console.log("Core Ran here");
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);

//register module for quiz is ran twice, had an error where quiz.client.module didn't work but left it there for sake of clarity
ApplicationConfiguration.registerModule('quiz');
