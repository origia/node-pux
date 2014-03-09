/**
 * PUX API client
**/

"use strict";

var _           = require('underscore')
  , request     = require('request')
  , parseString = require('xml2js').parseString


var defaults = {
  endPoint: 'http://eval.api.polestars.jp:8080/webapi/face.do'
, apiKey: process.env.PUX_API_KEY
}

var PuxClient = function (overrides) {
  this.options = _.extend({}, defaults, overrides)
}

_.extend(PuxClient.prototype, {

  authenticateFaceBase64: function (b64Image, options) {
    options = options || {}
    var self = this
    var data = { apiKey:      this.options.apiKey
               , mode:        'verify'
               , inputBase64: b64Image
               }
    request.post(this.options.endPoint, { form: data }, function (err, response, body) {
      parseString(body, function (err, result) {
        if (err === null) {
          if (response.statusCode === 200) {
            var resultData = result.results.faceRecognition[0]
            if (options.extractCandidate)
              resultData = self.extractCandidate(resultData)
            if (options.onSuccess) options.onSuccess(resultData)
          } else {
            if (options.onError) options.onError(result)
          }
        } else {
          if (options.onError) options.onError(err)
        }
      })
    })
  }

, extractCandidate: function (result) {
    if (!result.verificationFaceInfo[0].candidate) return null
    var firstCandidate = result.verificationFaceInfo[0].candidate[0]
      , score = firstCandidate.score[0]
    if (score > 50) return firstCandidate.faceId[0]
    else return null
  }
})


module.exports = PuxClient
