"use strict";

var PuxClient = require('./pux-client')


var puxClient = new PuxClient()
  , image = "data:image/jpeg;base64,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"

puxClient.authenticateFaceBase64(image, {
  extractCandidate: true
, onSuccess: function (id) {
    console.log(id)
  }
, onError: function (error) {
    console.log(error)
  }
})
