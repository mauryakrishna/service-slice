const express = require('express');
const app = express();
const routes = require("./routes")

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

app.use(routes)

app.listen(4000, () => {
  console.log(`Server started on port 4000.`)
})