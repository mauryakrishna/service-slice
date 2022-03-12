const express = require('express');
const crypto = require("crypto");
const app = express();

const sharedSecret = "SECRETSLYCECASESTUDY2022";

app.use(express.json())

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/health', (req, res) => {
  res.send("Hey! Am good.")
})

const users = [{
  "id": 1,
  "name": "John Smith",
  "email": "buyer@whitewaterventures.de"
  },
  {
  "id": 2,
  "name": "Jim Jones",
  "email": "seller@whitewaterventures.de"
  }]

const transactions = {
    "id": 100,
    "name": "ESOP Transaction",
    "shareCount": 250,
    "sharePrice": 1000,
    "status": "IN_PROGRESS",
    "sellerId": 2,
    "buyerId": 1,
    }

const documents = [{
    "id": 2001,
    "signatureEnvelope": 1001,
    "type": "TERM_SHEET",
    "transactionId": 100,
    "sellerStatus": "SIGNED",
    "sellerSigningDate": "2022-03-03T12:35:13Z",
    "buyerStatus": "SIGNED",
    "buyerSigningDate": "2022-03-04T10:10:22Z"
    },
    {
    "id": 2002,
    "signatureEnvelope": 1001,
    "type": "TRANSFER_AGREEMENT",
    "transactionId": 100,
    "sellerStatus": "PENDING",
    "sellerSigningDate": null,
    "buyerStatus": "PENDING",
    "buyerSigningDate": null
    }]
      
app.get('/users/:id', (req, res) => {
  const user = users.find(oneUser => oneUser.id == req.params.id)
  res.json(user)
})

app.get('/users/transactions/:transactionId', (req, res) => {
  res.json(transactions)
})

app.get('/documents/:transactionId', (req, res) => {
  res.json(documents.filter((document) => document.transactionId == req.params.transactionId))
})

// for webhook event to come in, we need to enable cors for path on our domain
app.post('/webhook/signatures', (req, res) => {
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

app.listen(4000, () => {
  console.log(`Server started on port 4000.`)
})