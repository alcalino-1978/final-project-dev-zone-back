const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

// const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

// Configure OpenAI API credentials
const openaiAPIKey = process.env.OPEN_AI_API_KEY;
openai.apiKey = openaiAPIKey;

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the route handler for the API endpoint
router.get("/me", (req, res) => {
  res.send("GET request to the Open AI");
});
router.post("/message", (req, res) => {
  const response = openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.prompt,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256,
  });

  response
    .then((data) => {
      res.send({ message: data.data.choices[0].text });
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

module.exports = router;
