const mongoose = require("mongoose");
const { DB_URL } = require('../utils/db');



const Company = require("../models/Company");

const companiesList = [
    {
    name:"Minsait" ,
    description:"Impulsamos la transformación de los negocios y la sociedad mediante soluciones y servicios innovadores, poniendo a las personas en el centro.",
    logo:"https://logos-download.com/wp-content/uploads/2022/01/Minsait_Logo.png" ,
    listOffers: "4",
    numberEmployees: 46000,
    developers: [],
    user: [],
    },
    {
    name:"inetum" ,
    description:"Inetum es una compañía de IT ágil que proporciona servicios y soluciones digitales y un grupo global que ayuda a compañías e instituciones a aprovechar al máximo el flow digital.",
    logo:"https://rhmagazine.pt/wp-content/uploads/2021/03/inetum_rhmagazine_online.jpg" ,
    listOffers: "1" ,
    numberEmployees:40000,
    developers: [],
    user: [],
    },
    {
    name: "ISVISOFT",
    description:"En Isvisoft desarrollamos ideas. No nos limitamos a programar, si no que nos implicamos al 100% con tu proyecto",
    logo: "https://isvisoft.com/wp-content/uploads/Isvisoft.png" ,
    listOffers:"0" ,
    numberEmployees:12,
    developers: [],
    user: [],
    },
    {
      name:"t-systems" ,
    description:"T-Systems ofrece soluciones integrales e integradas con las que acelera la transformación digital de empresas de todos los sectores y del sector público.",
    logo:"https://w7.pngwing.com/pngs/656/1009/png-transparent-logo-t-systems-do-brasil-ltda-font-embrace-purple-text-logo-thumbnail.png" ,
    listOffers:"3" ,
    numberEmployees:28000,
    developers: [],
    user: [],
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
