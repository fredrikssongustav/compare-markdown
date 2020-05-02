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

app.listen(port, () => console.log(`Example app listening on port ${port}.`));
