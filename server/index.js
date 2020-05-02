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

// Get source
app.get("/markdown/:sourceId", async (req, res) => {
  const {sourceId} = req.params
  const source = await api.getSource(sourceId);

  res.json({markdown:source.markdown});
});

// Get suggestion
app.get("/markdown/:sourceId/:suggestionId", async (req, res) => {
  const {sourceId,suggestionId} = req.params
  const suggestion = await api.getSuggestion(suggestionId);

  res.json(suggestion);
});

// Create source
app.post("/markdown", async (req, res) => {
  const {markdown} = req.body
  const source = await api.createSource(markdown);
  res.json(source);
});

app.listen(port, () => console.log(`Example app listening on port ${port}.`));
