const mongoose = require("mongoose");
const { DB_URL } = require('../utils/db');
const Company = require('../models/Company');



const Developer = require("../models/Developer");

const developersList = [
    {
      fullName: "Mariel Linskill",
      age: 48,
      gender: "Female",
      phoneNumber: "982-948-8357",
      email: "mlinskill@example.com",
      insurance: "Sanitas",
      registered: false,
      illness: 'Lupus',
    },
    {
      fullName: "Amelita Meachan",
      age: 16,
      gender: "Female",
      phoneNumber: "320-298-9349",
      email: "ameachan@example.com",
      insurance: "Asisa",
      illness: 'Covid',
    },
    {
      fullName: "West Mate",
      age: 26,
      gender: "Male",
      phoneNumber: "490-981-5560",
      email: "wmate@example.com",
      insurance: "Adeslas",
      illness: 'Diarrhea',
    },
    {
      fullName: "Staci Varnam",
      age: 15,
      gender: "Female",
      phoneNumber: "370-798-4092",
      email: "svarnam@example.com",
      insurance: "DKV",
      illness: 'Mononucleosis',
    },
    {
      fullName: "Cary Lassells",
      age: 83,
      gender: "Male",
      phoneNumber: "313-841-1038",
      email: "classells@example.com",
      insurance: "Maphre",
      illness: 'Pneumonia',
    },
    {
      fullName: "Paxon Butlin",
      age: 25,
      gender: "Male",
      phoneNumber: "421-755-7905",
      email: "pbutlin@example.com",
      insurance: "Asisa",
      illness: 'Lupus',
    },
    {
      fullName: "Denni Oury",
      age: 14,
      gender: "Female",
      phoneNumber: "877-554-9374",
      email: "doury@example.com",
      insurance: "Sanitas",
      illness: 'Lupus',
    },
    {
      fullName: "Johnna Olver",
      age: 7,
      gender: "Female",
      phoneNumber: "658-601-2777",
      email: "jolver@example.com",
      insurance: "Otros",
      illness: 'Covid',
    },
    {
      fullName: "Steve Costerd",
      age: 25,
      gender: "Male",
      phoneNumber: "877-895-0637",
      email: "scosterd@example.com",
      insurance: "DKV",
      illness: 'Lupus',
    },
    {
      fullName: "Thebault Moan",
      age: 28,
      gender: "Male",
      phoneNumber: "930-436-3777",
      email: "tmoan@example.com",
      insurance: "Adeslas",
      illness: 'Pneumonia',
    }
  ]
  ;

const developersDocuments = developersList.map((developer) => new Developer(developer));

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allDevelopers = await Developer.find();
    if (allDevelopers.length) {
        await Developer.collection.drop();
    }
    const allCompanies = await Company.find();
    developersDocuments.forEach(async developer => {
      const random = Math.floor(Math.random() * allCompanies.length);
      const company = allCompanies[random];
      developer.company = company.id;

      await Company.findByIdAndUpdate(
        company._id,
        { $push: { developers: developer._id , } },
        { new: true }
        ); 
    });

})
.catch((err) => console.log(`Error deleting data: ${err}`))
.then(async () => {
    console.log(developersDocuments)
    await Developer.insertMany(developersDocuments);
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
