const mongoose = require("mongoose");
const { DB_URL } = require('../utils/db');



const Company = require("../models/Company");

const companiesList = [
    {
      fullName: "Meredith Grey",
      age: 44,
      gender: "Female",
      phoneNumber: "982-948-8357",
      email: "mgrey@example.com",
      insurance: "Sanitas",
      registered: false,
      developers: [],
      user: []
    },
    {
      fullName: "Julius Hibbert",
      age: 44,
      gender: "Male",
      phoneNumber: "955-333-666",
      email: "jhibbert@example.com",
      insurance: ["DKV", "Otros"],
      registered: false,
      developers: [],
      user: []
    },
    {
      fullName: "Nick Riviera",
      age: 32,
      gender: "Male",
      phoneNumber: "935-363-686",
      email: "nriviera@example.com",
      insurance: ["Asisa", "Adeslas"],
      registered: false,
      developers: [],
      user: []
    },
    {
      fullName: "Gregory House",
      age: 53,
      gender: "Male",
      phoneNumber: "402-377-006",
      email: "ghouse@example.com",
      insurance: ["Maphre", "Adeslas", "Asisa"],
      registered: false,
      developers: [],
      user: []
    },
    
  ]
  ;

const companiesDocuments = companiesList.map((company) => new Company(company));

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allCompanies = await Company.find();
    if (allCompanies.length) {
        await Company.collection.drop();
    }
})
.catch((err) => console.log(`Error deleting data: ${err}`))
.then(async () => {
    console.log(companiesDocuments)
    await Company.insertMany(companiesDocuments);
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
