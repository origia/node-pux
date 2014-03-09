/**
 * PUX API client
**/

"use strict";

var _       = require('underscore')
  , request = require('request')


var defaults = {
  hostname: 'eval.api.polestars.jp',
  port: 8080,
  path: '/webapi/face.do'
}

var PuxClient = function (apiKey, overrides) {
  this.apiKey = apiKey
  this.options = _.extend({}, defaults, overrides)
}

_.extend(PuxClient.prototype, {

  authenticateFace: function (image) {

  }

})
