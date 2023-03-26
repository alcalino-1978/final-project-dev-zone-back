const express = require("express");
const mongoose = require("mongoose");
const { isAuth } = require("../auth/jwt");
const Company = require("../models/Company");
const Developer = require("../models/Developer");

const router = express.Router();

// viewAll=true
router.get("/", async (req, res, next) => {
  try {
    let companies = [];
    companies = await Company.find().populate("developers", "fullName cv");
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
    const company = await Company.findById(idObject).populate(
      "developers",
      "fullName cv"
    );
    console.log(company);
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
router.post("/", async (req, res, next) => {
  //console.log(req.body);
  const {email, password, name, description, logo, listOffers, numberEmployees} = req.body;
  const company = {
    email,
    password,
    name,
    description,
    logo,
    listOffers,
    numberEmployees,
  };
  try {
    console.log(company);
    const newCompany = new Company(company);
    const exists = await Company.exists({ name: company.name });
    if (exists) {
      return res.status(404).json("This company name already exists");
    } else {
      console.log(company.name);
      const createdCompany = await newCompany.save();
      return res.status(201).json(createdCompany);
    }
  } catch (error) {
    next(error);
  }
});

// Delete Company
//[isAuth],
router.delete("/:id",  async (req, res, next) => {
  try {
    const { id } = req.params;
    const nameCompany = await Company.findById(id).lean();
    console.log(nameCompany.fullName);

    // Para borrar las referencias del Company en todos los pacientes
    await Developer.updateMany(
      { company: id }, // filtro de búsqueda
      { $unset: { company: 1 } } // Con esto borramos el field company que concuerda con el filtro de búsqueda
    );
    await Company.findByIdAndDelete(id); // Borrado del company en la colección principal
    return res
      .status(200)
      .json(`Company ${nameCompany.fullName} has been deleted sucessfully!`);
  } catch (error) {
    next(error);
  }
});

// Put Update by ID
//[isAuth],
router.put("/:id",  async (req, res, next) => {
  try {
    const { id } = req.params;
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
