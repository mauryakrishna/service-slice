const express = require('express');
const crypto = require("crypto");
const router = express.Router()

const data = require("./data")
const sharedSecret = "SECRETSLYCECASESTUDY2022";

router.get('/users/:id', (req, res) => {
  const user = data.users.find(oneUser => oneUser.id == req.params.id)
  res.json(user)
})

router.get('/users/transactions/:transactionId', (req, res) => {
  res.json(data.transactions)
})

router.get('/documents/:transactionId', (req, res) => {
  res.json(data.documents.filter((document) => document.transactionId == req.params.transactionId))
})

// for webhook event to come in, we need to enable cors for path on our domain
router.post('/webhook/signatures', (req, res) => {
  const receivedSignature = req.headers['x-hmac-signature']

  // not sure if below computation is correct, as the signatures are not matching
  const computedSignature = crypto.createHmac('sha256', sharedSecret)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if(computedSignature == receivedSignature) {
    // update record matching against documentId/id and envelopId/signatureId from the WebHook/document
    res.status(200)
  }
  else {
    res.status(400)
  }
})


module.exports = router