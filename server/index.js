const api = require("./api");
const express = require("express");
const bodyParser = require("body-parser");

if (!process.env.FIREBASE_ID) {
  throw Error(
    "Environment variable `FIREBASE_ID` is not set."
  );
}

const app = express();
const port = 8080;

app.use(bodyParser.json());
// Create source
app.post("/markdown", async (req, res) => {
  const {markdown} = req.body
  const source = await api.createSource(markdown);
  res.json(source);
});

app.listen(port, () => console.log(`Example app listening on port ${port}.`));
