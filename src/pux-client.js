/**
 * PUX API client
**/

"use strict";

var _       = require('underscore')
  , request = require('request')


var defaults = {
  endPoint: 'http://eval.api.polestars.jp:8080/webapi/face.do'
}

var PuxClient = function (apiKey, overrides) {
  this.apiKey = apiKey
  this.options = _.extend({}, defaults, overrides)
}

_.extend(PuxClient.prototype, {

  authenticateFaceBase64: function (b64Image) {
    var data = { apiKey:      this.apiKey
               , mode:        'verify'
               , inputBase64: b64Image
               }
    request.post(this.options.endPoint, { form: data }, function (err, msg, response) {
      console.log(response)
    })
  }
})


module.exports = PuxClient
