const express = require("express");
const app = express();
const router = express.Router();
const relevantKeywords = require('../utils/relevantKeywordsAI.js');

// const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

// Configure OpenAI API credentials
const openaiAPIKey = process.env.OPEN_AI_API_KEY;
openai.apiKey = openaiAPIKey;



// Define the route handler for the API endpoint
router.get("/me", (req, res) => {
  res.send("GET request to the Open AI");
});


router.post("/message", (req, res) => {
  const prompt = req.body.prompt.toLowerCase();
  // Buscamos las palabras claves definidas del diccionario de claves en el prompt
  const promptKeywords = relevantKeywords.filter(keyword => prompt.includes(keyword.toLowerCase()));

  // Si no hay palabras claves, devolvemos un mensaje de error
  if (promptKeywords.length === 0) {
    res.send({ message: "Lo siento, no puedo responder a esa pregunta.\n\nDebes de incluir algunas de las palabras claves relacionada con el ámbito del desarrollo, como por ejemplo el lenguaje o tecnología sobre la que quieres hacer la consulta.\n\nGracias ;)" });
  } else { 
    // Si hay palabras claves, generamos la respuesta
      const response = openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 2048,
      });
    
      response
        .then((data) => {
          res.send({ message: data.data.choices[0].text });
        })
        .catch((err) => {
          res.send({ message: err });
        });
  }
});


module.exports = router;
