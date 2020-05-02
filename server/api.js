const fetch = require("node-fetch");
const uuid = require('uuid')

const API_URL = `https://${process.env.FIREBASE_ID}.firebaseio.com`;

const log = function(...args) {
  args.forEach(arg => {
    console.log(arg);
  });
  console.log("\n\n");
};

const createSource = async (markdown) => {
  log(markdown)
  const authId = uuid.v4()
  const response = await fetch(`${API_URL}/entries.json`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: `{"markdown": "${markdown}","authId":"${authId}"}`
  });

  const entry = await response.json();
  log("Markdown source entry created", entry);

  return {authId,...entry};
};

const getSource = async (id) => {
  const response = await fetch(`${API_URL}/entries/${id}.json`, {
    method: "GET",
  });

  const entry = await response.json();
  log("Markdown source entry fetched", entry);

  return entry;
};

module.exports = {
  log,
  createSource,
  getSource
};
