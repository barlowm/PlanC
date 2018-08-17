"use strict";

const $ = require("./gulp/config.js");

// Require all tasks in gulp/tasks, including subfolders
const theDirs = $.requireDir("./tasks", { recurse: true });

/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.

  Based on: vigetlabs/gulp-starter repo in github - https://github.com/vigetlabs/gulp-starter
*/
