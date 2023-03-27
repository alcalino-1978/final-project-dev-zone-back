const mongoose = require("mongoose");
const { DB_URL } = require('../utils/db');
const Company = require('../models/Company');
const Developer = require("../models/Developer");

const developersList = [
    {
      fullName: "CARLOS",
      age: 48,
      phoneNumber: "982-948-8357",
      email: "mlinskill@example.com",
      password: "1234",
      image: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      cv: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      salaryRange: {
        min: 25000,
        max: 30000,
      },
      languages: ['Español', "English", "Deutsche"],
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      typeJob: "Full Remote",
      movility: true
    },
    {
      fullName: "Mariel Linskill",
      age: 31,
      phoneNumber: "982-948-8357",
      email: "mlinskill@example.com",
      password: "1234",
      image: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      cv: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      salaryRange: {
        min: 35000,
        max: 50000,
      },
      languages: ['Español', "English", "Deutsche"],
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      typeJob: "Full Remote",
      movility: true
    },
    {
      fullName: "Amelita Meachan",
      age: 20,
      phoneNumber: "982-948-8357",
      email: "ameachan@example.com",
      password: "1234",
      image: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      cv: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      salaryRange: {
        min: 45000,
        max: 70000,
      },
      languages: ['Español', "English", "Deutsche"],
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      typeJob: "Full Remote",
      movility: true
    },
    {
      fullName: "West Mate",
      age: 40,
      phoneNumber: "982-948-8357",
      email: "wmate@example.com",
      password: "1234",
      image: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      cv: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      salaryRange: {
        min: 35000,
        max: 50000,
      },
      languages: ['Español', "English", "Deutsche"],
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      typeJob: "Full Remote",
      movility: true
    },
    {
      fullName: "Staci Varnam",
      age: 25,
      phoneNumber: "982-948-8357",
      email: "svarnam@example.com",
      password: "1234",
      image: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      cv: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      salaryRange: {
        min: 35000,
        max: 50000,
      },
      languages: ['Español', "English", "Deutsche"],
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      typeJob: "Full Remote",
      movility: true
    },
    {
      fullName: "Cary Lassells",
      age: 55,
      phoneNumber: "982-948-8357",
      email: "classells@example.com",
      password: "1234",
      image: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      cv: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      salaryRange: {
        min: 35000,
        max: 50000,
      },
      languages: ['Español', "English", "Deutsche"],
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      typeJob: "Full Remote",
      movility: true
    },
    {
      fullName: "Paxon Butlin",
      age: 48,
      phoneNumber: "982-948-8357",
      email: "pbutlin@example.com",
      password: "1234",
      image: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      cv: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      salaryRange: {
        min: 55000,
        max: 60000,
      },
      languages: ['Español', "English", "Deutsche"],
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      typeJob: "Full Remote",
      movility: true
    },
    
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
    // const allCompanies = await Company.find();
    // developersDocuments.forEach(async developer => {
    //   const random = Math.floor(Math.random() * allCompanies.length);
    //   const company = allCompanies[random];
    //   developer.company = company.id;

    //   await Company.findByIdAndUpdate(
    //     company._id,
    //     { $push: { developers: developer._id , } },
    //     { new: true }
    //     ); 
    // });

})
.catch((err) => console.log(`Error deleting data: ${err}`))
.then(async () => {
    console.log(developersDocuments)
    await Developer.insertMany(developersDocuments);
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
