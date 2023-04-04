const mongoose = require("mongoose");
const { DB_URL } = require('../utils/db');
const Company = require('../models/Company');
const JobOffer = require("../models/JobOffer");

const jobOffersList = [
   {
    title: 'Front-End Developer',
    description: `¡Claro! Aquí tienes una oferta de Front-End Developer con más detalles:

    Estamos buscando un Front-End Developer con habilidades en HTML, CSS y JavaScript, y experiencia en React. Debe tener habilidades para crear soluciones escalables y trabajar en equipo para asegurar el éxito del proyecto.
    
    El candidato ideal tendrá conocimientos en diseño UI/UX, experiencia en metodologías ágiles y en el uso de herramientas de control de versiones como Git. Además, debe tener habilidades de comunicación efectiva y la capacidad de trabajar bajo presión en un ambiente dinámico.
    
    Ofrecemos excelentes beneficios, oportunidades de crecimiento y desarrollo profesional y un ambiente de trabajo desafiante y dinámico. Si estás buscando un nuevo desafío en el desarrollo de software y quieres unirte a un equipo de alto rendimiento, ¡aplica ahora y únete a nosotros en nuestro camino hacia el éxito!`, 
    salaryRange: {
        min: 25000,
        max: 30000,
    },
    hiring: {
        shift: 'Rotating',
        contract: 'Indefinite-Term'
    },
    offerStatus: true,
    typeJob: 'Full Remote' ,
    vacancies: 2,
    applicants: [],
    keywords: [
      'front end',
      'angular',
      'react'
    ]
    },
   {
    title: 'Full-Stack Developer',
    description: `Estamos buscando un Full-Stack Developer con experiencia en tecnologías como JavaScript, React y Node.js. Debe tener habilidades para crear soluciones escalables y trabajar en equipo para asegurar el éxito del proyecto.

    El candidato ideal tendrá conocimientos de bases de datos como MySQL y MongoDB, experiencia en metodologías ágiles y en el uso de herramientas de control de versiones como Git. Además, debe tener habilidades de comunicación efectiva y la capacidad de trabajar bajo presión en un ambiente dinámico.
    
    Ofrecemos excelentes beneficios, oportunidades de crecimiento y desarrollo profesional y un ambiente de trabajo desafiante y dinámico. Si estás buscando un nuevo desafío en el desarrollo de software y quieres unirte a un equipo de alto rendimiento, ¡aplica ahora y únete a nosotros en nuestro camino hacia el éxito!`, 
    salaryRange: {
        min: 15000,
        max: 19000,
    },
    hiring: {
        shift: 'Split Day',
        contract: 'Training'
    },
    offerStatus: true,
    typeJob: 'Presential' ,
    vacancies: 5,
    applicants: [],
    keywords: [
      'full stack',
      'angular',
      'django'
    ]
    },
    {
    title: 'Back-End Developer',
    description: `Estamos buscando un desarrollador Back-End experimentado para unirse a nuestro equipo. Debes tener habilidades en lenguajes como Python, Node.js y bases de datos como MySQL y MongoDB, así como experiencia en diseño e implementación de soluciones escalables y seguras.

    Además, buscamos a alguien que esté actualizado en las últimas tecnologías y tendencias en el desarrollo de software. Es importante que tengas habilidades de comunicación y colaboración efectivas, así como la capacidad de trabajar en equipo y bajo presión.
   
    Ofrecemos un ambiente de trabajo dinámico y desafiante, oportunidades de crecimiento profesional y un salario competitivo. El trabajo remoto está disponible para aquellos que lo prefieran. ¡Únete a nuestro equipo y sé parte del futuro de nuestro éxito!`, 
    salaryRange: {
        min: 80000,
        max: 100000,
    },
    hiring: {
        shift: 'Full-Time',
        contract: 'Indefinite-Term'
    },
    offerStatus: true,
    typeJob: 'Hybrid' ,
    vacancies: 1,
    applicants: [],
    keywords: [
      'back end',
      'python',
      'node'
    ]
    },
   {
    title: 'Software Engineer',
    description: `Estamos buscando un Software Engineer con experiencia en Azure, .NET, C# y SQL Server para unirse a nuestro equipo. El candidato ideal debe ser capaz de diseñar, desarrollar e implementar soluciones escalables y de alta calidad en la nube de Azure.

    Además, deberá tener habilidades de colaboración y comunicación efectivas, así como experiencia en metodologías ágiles y en el uso de herramientas de control de versiones como Git.
    
    Ofrecemos excelentes beneficios, oportunidades de crecimiento y desarrollo profesional y un ambiente de trabajo desafiante y dinámico. Si estás buscando un nuevo desafío en el desarrollo de software y tienes experiencia en Azure, .NET, C# y SQL Server, ¡aplica ahora y únete a nosotros en nuestro camino hacia el éxito!!`, 
    salaryRange: {
        min: 30000,
        max: 40000,
    },
    hiring: {
        shift: 'Part-Time',
        contract: 'Fixed-Term'
    },
    offerStatus: true,
    typeJob: 'Hybrid' ,
    vacancies: 1,
    applicants: [],
    keywords: [
      'software engineer',
      'SQL',
      'c++',
      'azure'
    ]
    }
];

const jobOffersDocuments = jobOffersList.map((jobOffer) => new JobOffer(jobOffer));

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allJobOffers = await JobOffer.find();
    if (allJobOffers.length) {
        await JobOffer.collection.drop();
    }

    const allCompanies = await Company.find();
    jobOffersDocuments.forEach(async jobOffer => {

      const randomCompany = Math.floor(Math.random() * allCompanies.length);
      const company = allCompanies[randomCompany];
      
      jobOffer.company = company.id;

      await Company.findByIdAndUpdate(
        company._id,
        { $push: { listOffers: jobOffer._id , } },
        { new: true }
        ); 

    });
})
.catch((err) => console.log(`Error deleting data: ${err}`))
.then(async () => {
    console.log(jobOffersDocuments)
    await JobOffer.insertMany(jobOffersDocuments);
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());