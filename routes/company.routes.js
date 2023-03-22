const express = require('express');
const mongoose = require('mongoose');
const { isAuth } = require('../auth/jwt');
const Company = require('../models/Company');
const Developer = require('../models/Developer');

const router = express.Router();

// viewAll=true
router.get('/', async (req, res, next) => {
  const { fullInfo, insuranceQuery } = req.query;
  try {
    let companies = [];
    if (fullInfo === 'true') {
      console.log(companies);
      companies = await Company.find().populate('developers');
    } else if(insuranceQuery) {
      companies = await Company.find({insurance: insuranceQuery});
      if (companies.length === 0) {
        return res.status(404).json(`${insuranceQuery} not exist in Database`);
      }
    } else {
      companies = await Company.find();
    }
    console.log(companies)
    return res.status(200).json(companies);
  } catch (error) {
    return next(error);
  }
});

// Get Company by id

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const idObject = mongoose.Types.ObjectId(id);
    console.log(idObject);
    const company = await Company.findById(idObject).populate('developers');
    console.log(company);
    if (company) {
      return res.status(200).json(company);
    } else {
      return res.status(404).json('No Company found by this id');
    }

  } catch (err) {
    return next(err);
  }
})

// Post Company
router.post('/', [isAuth], async (req, res, next) => {
  const { fullName, age, gender, phoneNumber, email, insurance, developers, user } = req.body;
  const company = {
    fullName,
    age,
    gender,
    phoneNumber,
    email,
    insurance,
    developers,
    user
  }
  try {
    const newCompany = new Company(company);

    // Check If company exists
    const result = await Company.exists({ fullName: newCompany.fullName });
    if (result) {
      return res.status(404).json('This company fullName already exists');
    } else {
      console.log(newCompany.fullName);
      const createdCompany = await newCompany.save();
      return res.status(201).json(createdCompany);
    }
  } catch (error) {
    next(error);
  }
});

// Delete Company
router.delete('/:id', [isAuth], async (req, res, next) => {
  try {
    const { id } = req.params;
    const nameCompany = await Company.findById(id).lean();
    console.log(nameCompany.fullName);

    // Para borrar las referencias del Company en todos los pacientes
    await Developer.updateMany(
      {company: id}, // filtro de búsqueda
      {$unset:  {company: 1}} // Con esto borramos el field company que concuerda con el filtro de búsqueda
    );
    await Company.findByIdAndDelete(id); // Borrado del company en la colección principal
    return res.status(200).json(`Company ${nameCompany.fullName} has been deleted sucessfully!`)
  } catch (error) {
    next(error);
  }
})

// Put Update by ID

router.put('/:id', [isAuth], async (req, res, next) => {
  try {
    const { id } = req.params;
    const companyModify = new Company(req.body);
    companyModify._id = id;
    const company = await Company.findByIdAndUpdate(id, companyModify);
    if (company) {
      return res.status(200).json(companyModify);
    } else {
      return res.status(404).json('Company by this ID it is not found');
    }
  } catch (error) {
    next(error);
  }
})
module.exports = router;