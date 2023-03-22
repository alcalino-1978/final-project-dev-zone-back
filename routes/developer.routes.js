const express = require('express');
const mongoose = require('mongoose');
const Developer = require('../models/Developer');
const Company = require('../models/Company');
const { isAuth } = require('../auth/jwt');

const fileMiddleware = require('../middlewares/file.middleware');
const router = express.Router();

// Get alls Developer
//router.get('/', [isAuth], async (req, res, next) => {
router.get('/',  async (req, res, next) => {
  const { illnessQuery, insuranceQuery } = req.query;
  let developers = [];
  try {
    if (illnessQuery) {
      developers = await Developer.find({illness: illnessQuery});
      if (developers.length === 0) {
        return res.status(404).json(`${illnessQuery} not exist in Database`);
      }
    } else if(insuranceQuery) {
      developers = await Developer.find({insurance: insuranceQuery});
      if (developers.length === 0) {
        return res.status(404).json(`${insuranceQuery} not exist in Database`);
      }
    } else {
      developers = await Developer.find().populate('company');
    }
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

// Post developer
router.post('/', [fileMiddleware.upload.single('image'), fileMiddleware.uploadToCloudinary], async (req, res, next) => {
  const cloudinaryUrl = req.file_url ? req.file_url : null;
  const { fullName, age, gender, phoneNumber, email, insurance, registered, password, illness, company = 'Julius Hibbert' } = req.body;
  const developer = {
    fullName,
    age,
    gender,
    phoneNumber,
    email,
    insurance,
    registered,
    password,
    illness,
    company,
    image: cloudinaryUrl
  }
  try {
    const newDeveloper = new Developer(developer);

    // Check If developer exists
    const result = await Developer.exists({ fullName: newDeveloper.fullName });
    if (result) {
      return res.status(404).json('This developer fullName already exists');
    } else {
      console.log(newDeveloper.fullName);
      const createdDeveloper = await newDeveloper.save();
      return res.status(201).json(createdDeveloper);
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

module.exports = router;
