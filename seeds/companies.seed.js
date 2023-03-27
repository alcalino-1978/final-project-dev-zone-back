const mongoose = require("mongoose");
const { DB_URL } = require('../utils/db');



const Company = require("../models/Company");
const Developer = require("../models/Developer");

const companiesList = [
    {
    email:"aa@b.com" ,
    password:"1234",
    name:"Minsait" ,
    description:"Impulsamos la transformación de los negocios y la sociedad mediante soluciones y servicios innovadores, poniendo a las personas en el centro.",
    logo:"https://logos-download.com/wp-content/uploads/2022/01/Minsait_Logo.png" ,
    listOffers: [],
    numberEmployees: 46000,
    developers: [], 
    },
    {
    email:"ab@b.com" ,
    password:"1234",
    name:"inetum" ,
    description:"Inetum es una compañía de IT ágil que proporciona servicios y soluciones digitales y un grupo global que ayuda a compañías e instituciones a aprovechar al máximo el flow digital.",
    logo:"https://rhmagazine.pt/wp-content/uploads/2021/03/inetum_rhmagazine_online.jpg" ,
    listOffers: [] ,
    numberEmployees:40000,
    developers: [],   
    },
    {
    email:"ac@b.com" ,
    password:"1234", 
    name: "ISVISOFT",
    description:"En Isvisoft desarrollamos ideas. No nos limitamos a programar, si no que nos implicamos al 100% con tu proyecto",
    logo: "https://isvisoft.com/wp-content/uploads/Isvisoft.png" ,
    listOffers:[] ,
    numberEmployees:12,
    developers: [],   
    },
    {
    email:"af@b.com" ,
    password:"1234",
    name:"t-systems" ,
    description:"T-Systems ofrece soluciones integrales e integradas con las que acelera la transformación digital de empresas de todos los sectores y del sector público.",
    logo:"https://w7.pngwing.com/pngs/656/1009/png-transparent-logo-t-systems-do-brasil-ltda-font-embrace-purple-text-logo-thumbnail.png" ,
    listOffers:[] ,
    numberEmployees:28000,
    developers: [],   
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
    const allDevelopers = await Developer.find();
    companiesDocuments.forEach(async company => {
      const random = Math.floor(Math.random() * allDevelopers.length);
      const developer = allDevelopers[random];
      company.developers = developer.id;

      await Company.findByIdAndUpdate(
        developer._id,
        { $push: { companies: company._id , } },
        { new: true }
        ); 
    });
})
.catch((err) => console.log(`Error deleting data: ${err}`))
.then(async () => {
    console.log(companiesDocuments)
    await Company.insertMany(companiesDocuments);
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
