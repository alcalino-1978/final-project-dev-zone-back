const express = require("express");
const mongoose = require("mongoose");
const { isAuth } = require("../auth/jwt");
const Company = require("../models/Company");
const Developer = require("../models/Developer");

const bcrypt = require("bcrypt");
// Cargamos el módulo de jsonwebtoken
const jwt = require("jsonwebtoken");


const fileMiddleware = require('../middlewares/file.middleware');

const router = express.Router();

// viewAll=true
router.get("/", async (req, res, next) => {
  let companies = [];  
  try {
    companies = await Company.find()
    .populate("developers", "fullName cv")
    .populate("listOffers", "title");
    //const employee = await Employee.find();
    return res.status(200).json(companies);
  } catch (err) {
    return next(err);
  }
});

// Get Company by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const idObject = mongoose.Types.ObjectId(id);
    console.log(idObject);
    const company = await Company.findById(idObject)
    .populate("developers", "fullName cv")
    .populate("listOffers", "title createdAt offerStatus");
    //console.log(company);
    if (company) {
      return res.status(200).json(company);
    } else {
      return res.status(404).json("No Company found by this id");
    }
  } catch (err) {
    return next(err);
  }
});

// Post Company
router.post("/",[fileMiddleware.upload.single('logo'), fileMiddleware.uploadToCloudinary] ,async (req, res, next) => {
  const pwdHash = await bcrypt.hash(req.body.password, 10);
  const cloudinaryUrl = req.file_url ? req.file_url : null;
  const {email, password, name, description, logo, cif, listOffers, numberEmployees} = req.body;
  const company = {
    email,
    password,
    name,
    description,
    logo: cloudinaryUrl,
    cif,
    listOffers,
    numberEmployees,
  };
  try {
    console.log(company);
    const newCompany = new Company(company);
    newCompany.password = pwdHash;

    const exists = await Company.exists({ name: company.name });
   // const result = await Developer.exists({ email: newDeveloper.email });
    if (exists) {
      return res.status(404).json("This company name already exists");
    } else {
      console.log(company.name);
      const createdCompany = await newCompany.save();
      newCompany.password = null;
      //creamos el token con el id y el name del user
      const token = jwt.sign(
        {
          id: newCompany._id,
          email: newCompany.email
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      //return res.status(201).json(createdCompany);
      return res.json({
        status: 201,
        message: 'User registered and logged in correctly',
        data: { createdCompany, token: token }
      });
    }
  } catch (error) {
    next(error);
  }
});

// Delete Company
//[isAuth],
router.delete("/:id",[isAuth],  async (req, res, next) => {
  try {
    const { id } = req.params;
    const nameCompany = await Company.findById(id).lean();
    console.log(nameCompany.name);

    // Para borrar las referencias del Company en todos los pacientes
    await Developer.updateMany(
      { company: id }, // filtro de búsqueda
      { $unset: { company: 1 } } // Con esto borramos el field company que concuerda con el filtro de búsqueda
    );
    await Company.findByIdAndDelete(id); // Borrado del company en la colección principal
    return res
      .status(200)
      .json(`Company ${nameCompany.name} has been deleted sucessfully!`);
  } catch (error) {
    next(error);
  }
});

// PATCH Update by ID
router.patch('/:id',  async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar la compañia por id
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).send({ error: 'Company by this ID it is not found' });
    }
    // Actualizar los campos recibidos en req.body
    Object.keys(req.body).forEach((key) => {
      if (key !== '_id') {
        company[key] = req.body[key];
      }
    });
    await company.save();
    res.send(company);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error in update field' });
  }
});

router.patch('/:id',  async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar la compañia por id
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).send({ error: 'Company by this ID it is not found' });
    }
    // Actualizar los campos recibidos en req.body
    Object.keys(req.body).forEach((key) => {
      if (key !== '_id') {
        company[key] = req.body[key];
      }
    });
    await company.save();
    res.send(company);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error in update field' });
  }
});


// PUT Update by ID
router.put("/:id",[isAuth], async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body, id);
    const companyModify = new Company(req.body);
    companyModify._id = id;
    const company = await Company.findByIdAndUpdate(id, companyModify);
    if (company) {
      return res.status(200).json(companyModify);
    } else {
      return res.status(404).json("Company by this ID it is not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
