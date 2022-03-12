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
      
module.exports = { 
  users: users,
  transactions: transactions,
  documents: documents,
}