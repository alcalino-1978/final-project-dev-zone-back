const express = require('express');
const mongoose = require('mongoose');
const Developer = require('../models/Developer');
const Company = require('../models/Company');

const bcrypt = require("bcrypt");
// Cargamos el módulo de jsonwebtoken
const jwt = require("jsonwebtoken");
const { register, login, isAuth, logout, deleteUser } = require("../auth/jwt");

const fileMiddleware = require('../middlewares/file.middleware');
const router = express.Router();

// Get alls Developer
//router.get('/', [isAuth], async (req, res, next) => {
router.get('/',  async (req, res, next) => {
  const { illnessQuery, insuranceQuery } = req.query;
  let developers = [];
  try {
    developers = await Developer.find();
    return res.status(200).json(developers);
  } catch {
    return next(err);
  }
})

// Get developer by id

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const idObject = mongoose.Types.ObjectId(id);
    const developer = await Developer.findById(idObject);
    if (developer) {
      return res.status(200).json(developer);
    } else {
      return res.status(404).json('No developer found by this id');
    }

  } catch (err) {
    return next(err);
  }

})


// Post Creation developer
router.post('/', [fileMiddleware.upload.single('image'), fileMiddleware.uploadToCloudinary], async (req, res, next) => {
  console.log(req.file_url)
  const pwdHash = await bcrypt.hash(req.body.password, 10);
  const cloudinaryUrl = req.file_url ? req.file_url : null;
  const { fullName, age, phoneNumber, email, password, cv, salary, languages, portfolio, experience, hardSkills, softSkills, typeJob, movility } = req.body;
  const developer = {
    fullName,
    age,
    phoneNumber,
    email,
    password,
    image: cloudinaryUrl,
    cv,
    salary,
    languages,
    portfolio,
    experience,
    hardSkills,
    softSkills,
    typeJob,
    movility
  }
  try {
    const newDeveloper = new Developer(developer);
    
    newDeveloper.password = pwdHash;
    // Check If developer exists
    const result = await Developer.exists({ email: newDeveloper.email });
    if (result) {
      return res.status(404).json('This developer email already exists');
    } else {
      console.log(newDeveloper.fullName);
      const createdDeveloper = await newDeveloper.save();
      newDeveloper.password = null;
      //creamos el token con el id y el name del user
      const token = jwt.sign(
        {
          id: newDeveloper._id,
          email: newDeveloper.email
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      return res.json({
        status: 201,
        message: 'User registered and logged in correctly',
        data: { createdDeveloper, token: token }
      });
    }
  } catch (error) {
    next(error);
  }
})


// Delete developer
router.delete('/:id', [isAuth], async (req, res, next) => {
  try {
    const { id } = req.params;
    const nameDeveloper = await Developer.findById(id).lean();
    console.log(nameDeveloper.fullName);
    
    // const developerRelations = await Company.find({}).select('developers -_id');
    // console.log(developerRelations);
    await Company.updateMany({}, {
      $pullAll: {
          developers: [{_id: id}],
      },
    });
    await Developer.findByIdAndDelete(id);
    return res.status(200).json(`Developer ${nameDeveloper.fullName} has been deleted sucessfully!`)
  } catch (error) {
    next(error);
  }
})

// Put Update by ID

router.put('/:id', [isAuth], async (req, res, next) => {
  try {
    const { id } = req.params;
    const developerModify = new Developer(req.body);
    developerModify._id = id;
    const developer = await Developer.findByIdAndUpdate(id, developerModify);
    if (developer) {
      return res.status(200).json(developerModify);
    } else {
      return res.status(404).json('Developer by this ID it is not found');
    }
  } catch (error) {
    next(error);
  }
})

router.patch('/:id', [isAuth], async (req, res, next) => {
  try {
    const { id } = req.params;
    const developerModify = new Developer(req.body);
    developerModify._id = id;
    const developer = await Developer.findByIdAndUpdate(id, developerModify);
    if (developer) {
      return res.status(200).json(developerModify);
    } else {
      return res.status(404).json('Developer by this ID it is not found');
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;
