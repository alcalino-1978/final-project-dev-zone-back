const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Auth
require("jsonwebtoken"); // Requerimos nuestro archivo de configuración

// Utils
const { connect } = require("./utils/db");

// Server config
connect();
const app = express();
const PORT = process.env.PORT || 3000;

// Routes config
const developersRoutes = require("./routes/developer.routes");
const companiesRoutes = require("./routes/company.routes");
const openiaRoutes = require("./routes/openai.routes");

//CORS CONFIG
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.set("view engine", "ejs");

// Middlewares config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config JWT
app.set("secretKey", "nodeRestApi"); 

//Routes
app.use("/v1/developers", developersRoutes);
app.use("/v1/companies", companiesRoutes);

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
