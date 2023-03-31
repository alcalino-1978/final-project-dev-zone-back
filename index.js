const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const fs = require('fs');

// Auth
require("jsonwebtoken"); // Requerimos nuestro archivo de configuración

// Utils
const { connect } = require("./utils/db");

// Server config
connect();
const app = express();
//const PORT = process.env.PORT || 3000;
const PORT =  3000;

// Routes config
const developersRoutes = require("./routes/developer.routes");
const companiesRoutes = require("./routes/company.routes");
const jobOfferRoutes = require("./routes/joboffer.routes");
const openiaRoutes = require("./routes/openai.routes");
const userRoutes = require("./routes/user.routes");

//CORS CONFIG
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.set("view engine", "ejs");
// Configure body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Middlewares config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config JWT
app.set("secretKey", "nodeRestApi"); 

//Routes
app.use("/v1/developers", developersRoutes);
app.use("/v1/companies", companiesRoutes);
app.use("/v1/joboffers", jobOfferRoutes);
app.use("/v1/users", userRoutes);
app.use("/v1/gpt-3", openiaRoutes);

// Control error
app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

// Listen Server
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
