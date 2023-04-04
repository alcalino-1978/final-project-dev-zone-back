const mongoose = require("mongoose");
const { DB_URL } = require('../utils/db');
const bcrypt = require('bcrypt');



const Company = require("../models/Company");
const Developer = require("../models/Developer");

const companiesList = [
    {
    email:"chema@minsait.com" ,
    password:"1234",
    name:"Minsait" ,
    description:`Impulsamos la transformación de los negocios y la sociedad mediante soluciones y servicios innovadores, poniendo a las personas en el centro.\n
    Bienvenidos a la revolución tecnológica más humana.\n
    Somos la huella que dejamos y la huella que queremos dejar.`,
    logo:"https://logos-download.com/wp-content/uploads/2022/01/Minsait_Logo.png" ,
    cif: "E09031188",
    listOffers: [],
    numberEmployees: 46000,
    developers: [], 
    },
    {
    email:"Alberto@inetum.com" ,
    password:"1234",
    name:"inetum" ,
    description:`Inetum es una compañía de IT ágil que proporciona servicios y soluciones digitales y un grupo global que ayuda a compañías e instituciones a aprovechar al máximo el flow digital.\n
    Con su perfil multi-experto, Inetum ofrece a sus clientes una combinación única de proximidad, organización sectorial y soluciones de última generación \n
    Presente en más de 27 países, el Grupo tiene cerca de 27.000 empleados y en 2021 generó unos ingresos de 2.200 millones de euros.`,
    logo:"https://www.inetum.com/upload/public/styles/small_large_720/public/media/image/2022-09/logo%20inetum.jpg?itok=Bh2LH3Tg",
    cif: "	A28855260",
    listOffers: [] ,
    numberEmployees:27000,
    developers: [],   
    },
    {
    email:"carlos@altia.com" ,
    password:"1234", 
    name: "ALTIA",
    description:`Somos una compañía que ofrece servicios de alto valor de tecnologías de la información y consultoría de transformación digital.\n

    Gracias al compromiso de nuestros más de 3.200 profesionales, repartidos en más de 20 localizaciones de 7 países, acompañamos como socio tecnológico a más de 900 clientes en todo el mundo.\n
    
    Con 28 años de experiencia somos una de las primeras compañías independientes del sector.
    
    Grupo Altia cotiza en el BME Growth, el mercado de las empresas en expansión.`,
    logo: "https://www.aenovomilladoiro.com/media/im/1200x900-altiaweb-1620120428.png" ,
    cif: "A15456585",
    listOffers:[] ,
    numberEmployees:3200,
    developers: [],   
    },
    {
    email:"rafa@tsystems.com" ,
    password:"1234",
    name:"T-Systems" ,
    description:`En T-Systems, encontrarás proyectos rompedores que suman al bienestar social y ecológico.\n
    Queremos dar la bienvenida a nuevos talentos como tú, puntos de vista distintos, que acepten retos y un continuo aprendizaje.\n
    ¡Todo esto, de una forma divertida!`,
    logo:"https://pcformat.mx/www/wp-content/uploads/2022/02/T-Systems-logo.png" ,
    cif: "A81608077",
    listOffers:[] ,
    numberEmployees:28000,
    developers: [],   
    },  
    {
      email:"mario@capgemini.com" ,
      password:"1234",
      name:"Capgemini" ,
      description:`Capgemini colabora con compañías para transformar y administrar su negocio liberando el valor de la tecnología.\n
      Como socio estratégico para empresas de todo el mundo, hemos aprovechado el valor la tecnología para permitir la transformación empresarial durante más de 50 años.\n
       Abordamos toda la gama de necesidades comerciales, desde la estrategia y el diseño hasta la gestión de operaciones.\n
       Para hacer esto, recurrimos a una profunda experiencia en cada sector y un dominio total de la innovación en rápida evolución como el cloud, la inteligencia artificial de datos...`,
      logo:"https://lespetitesannoncesdemarine.files.wordpress.com/2019/07/capgemini-logo.jpg?w=1200" ,
      cif: "B08377715",
      listOffers:[] ,
      numberEmployees:12000,
      developers: [],   
      }  
  ]
  ;
// Iterar sobre la lista de empresas y hashear las contraseñas
companiesList.forEach((company) => {
  const saltRounds = 10; // número de rondas de hash para bcrypt
  const hashedPassword = bcrypt.hashSync(company.password, saltRounds); // hashear la contraseña
  company.password = hashedPassword; // reemplazar la contraseña sin hashear con la hasheada
});
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
