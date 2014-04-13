/**
 * Handlebars Helper: {{read}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

'use strict';

var path = require('path');
var file = require('fs-utils');
var matter = require('gray-matter');
var _ = require('lodash');

module.exports.register = function (Handlebars) {

  Handlebars.registerHelper("read", function(filepath, context) {
    context.data = context.data || {};
    var page = matter.read(filepath);
    var metadata = _.extend(context.data.root, page.context);
    var template = Handlebars.compile(page.content);
    return new Handlebars.SafeString(template(metadata));
  });

  /**
   * Write a file to disk.
   *
   * @param   {String}  filepath Filepath of the destination file
   * @param   {String}  content  Content to write to the file.
   * @return  {String}
   */

  Handlebars.registerHelper("write", function(filepath, content) {
    return file.writeFileSync(filepath, content);
  });

  /**
   * Write the give context to a JSON file.
   * @param   {String}  dest     Destination directory
   * @param   {String}  name     Destination file name
   * @param   {Object}  context  Context object
   * @return  {Object}           JSON File with context
   *
   * @example
   *   {{writeJSON 'tmp/page/' basename this.page}}
   *
   */

  Handlebars.registerHelper("writeJSON", function(dest, name, context) {
    return file.writeJSONSync(path.join(dest, name) + '.json', context);
  });
};