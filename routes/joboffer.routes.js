const express = require('express');
const mongoose = require('mongoose');
const { isAuth } = require('../auth/jwt');
const JobOffer = require('../models/JobOffer');
const Company = require('../models/Company');


const router = express.Router();

// Get all Job Offers

router.get('/', async (req, res, next) => {
  try {
    let joboffers = [];
      joboffers = await JobOffer.find()
        .populate('company', 'name logo numberEmployees')
        .populate('applicants', 'fullName photo');
    return res.status(200).json(joboffers);
  } catch (error) {
    return next(error);
  }
});

// Get Offer by id

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const idObject = mongoose.Types.ObjectId(id);
    console.log(idObject);
    const joboffer = await JobOffer.findById(idObject)
    .populate('company', 'name logo numberEmployees')
    .populate('applicants', 'fullName photo');
    console.log(joboffer);
    if (joboffer) {
      return res.status(200).json(joboffer);
    } else {
      return res.status(404).json('No Offer found by this ID');
    }

  } catch (err) {
    return next(err);
  }
})

// Post Offer
router.post('/', async (req, res, next) => {
  const { 
    title,
    description,
    company,
    salaryRange,
    hiring,
    offerStatus,
    typeJob,
    vacancies,
    applicants
  } = req.body;
  const jobOffer = {
    title,
    description,
    company,
    salaryRange,
    hiring,
    offerStatus,
    typeJob,
    vacancies,
    applicants
  }
  try {
    const newJobOffer = new JobOffer(jobOffer);
    const createdOffer = await newJobOffer.save();
    return res.status(201).json(`The ${createdOffer.title} offer has been created succesfully!`);
  } catch (error) {
    next(error);
  }
});

// Delete Offer
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const offer = await JobOffer.findById(id).lean();
    console.log(offer.title);

    // Para borrar las ofertas asignadas en Companies
    await Company.updateMany({}, {
      $pullAll: {
          listOffers: [{_id: id}],
      },
    });
    await JobOffer.findByIdAndDelete(id);
    return res.status(200).json(`${offer.title} offer has been deleted sucessfully!`)
  } catch (error) {
    next(error);
  }
})

// Patch Update by ID
router.patch('/:id', [isAuth],  async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar el desarrollador por id
    const jobOffer = await JobOffer.findById(id);
    if (!jobOffer) {
      return res.status(404).send({ error: 'jobOffer by this ID it is not found' });
    }
    // Actualizar los campos recibidos en req.body
    Object.keys(req.body).forEach((key) => {
      if (key !== '_id') {
        jobOffer[key] = req.body[key];
      }
    });
    await jobOffer.save();
    res.send(jobOffer);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error in update field' });
  }
});

// Put Update by ID

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const modifyOffer = new JobOffer(req.body);
    modifyOffer._id = id;
    const offer = await JobOffer.findByIdAndUpdate(id, modifyOffer);
    if (offer) {
      return res.status(200).json(`Offer with ID: ${modifyOffer.id} has been updated sucessfully!'`);
    } else {
      return res.status(404).json('Offer by this ID it is not found');
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;