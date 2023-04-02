const mongoose = require("mongoose");
const { DB_URL } = require('../utils/db');
const bcrypt = require('bcrypt');
const Company = require('../models/Company');
const Developer = require("../models/Developer");

const developersList = [
    {
      fullName: "john Doe",
      age: 48,
      phoneNumber: "982-948-8357",
      email: "johndoe@example.com",
      password: "1234",
      image: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      cv: "https://content.fakeface.rest/male_32_9d2b88c0c6c206ebe712dc278f5c99088e3bf384.jpg",
      salaryRangeMin: 30000,
      salaryRangeMax: 35000,
      languages: ['Español', "English", "Deutsche"],
      portfolio: ['https://github.com/', "https://gitlab.com/", "https://bitbucket.org/"],
      experience: `Como desarrollador front-end con experiencia, he trabajado en diversos proyectos y etapas del ciclo de desarrollo. Tengo habilidades sólidas en programación, diseño web y colaboración en equipo.\n

      He creado interfaces de usuario para aplicaciones web y móviles, implementado diseños y funcionalidades, y desarrollado temas personalizados para diferentes plataformas. También he trabajado en estrecha colaboración con diseñadores, desarrolladores de back-end y gestores de proyectos para entregar productos digitales de alta calidad a tiempo.\n
      
      Me mantengo actualizado en las últimas tendencias y herramientas en tecnología y diseño web, participando en cursos y conferencias para aprender nuevas habilidades. Soy apasionado por la tecnología y la creación de productos digitales que mejoren la vida de las personas.\n
      
      Estoy comprometido en seguir siendo un profesional altamente capacitado y efectivo en mi trabajo.`,
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: `UpgradeHub: una escuela de tecnología que ofrece programas de formación en desarrollo web y de aplicaciones móviles. En el curso Full Stack Web Development, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, MongoDB, Express, React y Redux.

      Udacity: una plataforma en línea que ofrece cursos de tecnología de pago y gratuitos. En el programa Nanodegree Full Stack Web Developer, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, SQL y MongoDB, y construyen proyectos de aplicaciones web y móviles.
      
      Coursera: una plataforma de aprendizaje en línea que ofrece cursos y programas de grado de universidades y organizaciones en todo el mundo. En el programa de grado en línea de la Universidad de Londres, los estudiantes estudian el desarrollo completo de aplicaciones web utilizando tecnologías como HTML, CSS, JavaScript, Node.js y React.
      
      Fullstack Academy: una escuela de tecnología que ofrece cursos intensivos en desarrollo web y móvil. En el programa Full Stack Web Development, los estudiantes aprenden JavaScript, React, Node.js, Express y MongoDB, y trabajan en proyectos de desarrollo web y móvil.
      
      General Assembly: una escuela de tecnología que ofrece cursos de formación en desarrollo web, diseño y marketing digital. En el curso de desarrollo web a tiempo completo, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, React, MongoDB y Express, y trabajan en proyectos de desarrollo web de principio a fin.`,
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
      salaryRangeMin: 35000,
      salaryRangeMax: 50000,
      languages: ['Español', "English", "Deutsche"],
      portfolio: ['https://github.com/', "https://gitlab.com/", "https://bitbucket.org/"],
      experience: `Como desarrollador front-end con experiencia, he trabajado en diversos proyectos y etapas del ciclo de desarrollo. Tengo habilidades sólidas en programación, diseño web y colaboración en equipo.

      He creado interfaces de usuario para aplicaciones web y móviles, implementado diseños y funcionalidades, y desarrollado temas personalizados para diferentes plataformas. También he trabajado en estrecha colaboración con diseñadores, desarrolladores de back-end y gestores de proyectos para entregar productos digitales de alta calidad a tiempo.
      
      Me mantengo actualizado en las últimas tendencias y herramientas en tecnología y diseño web, participando en cursos y conferencias para aprender nuevas habilidades. Soy apasionado por la tecnología y la creación de productos digitales que mejoren la vida de las personas.
      
      Estoy comprometido en seguir siendo un profesional altamente capacitado y efectivo en mi trabajo.`,
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: `UpgradeHub: una escuela de tecnología que ofrece programas de formación en desarrollo web y de aplicaciones móviles. En el curso Full Stack Web Development, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, MongoDB, Express, React y Redux.

      Udacity: una plataforma en línea que ofrece cursos de tecnología de pago y gratuitos. En el programa Nanodegree Full Stack Web Developer, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, SQL y MongoDB, y construyen proyectos de aplicaciones web y móviles.
      
      Coursera: una plataforma de aprendizaje en línea que ofrece cursos y programas de grado de universidades y organizaciones en todo el mundo. En el programa de grado en línea de la Universidad de Londres, los estudiantes estudian el desarrollo completo de aplicaciones web utilizando tecnologías como HTML, CSS, JavaScript, Node.js y React.
      
      Fullstack Academy: una escuela de tecnología que ofrece cursos intensivos en desarrollo web y móvil. En el programa Full Stack Web Development, los estudiantes aprenden JavaScript, React, Node.js, Express y MongoDB, y trabajan en proyectos de desarrollo web y móvil.
      
      General Assembly: una escuela de tecnología que ofrece cursos de formación en desarrollo web, diseño y marketing digital. En el curso de desarrollo web a tiempo completo, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, React, MongoDB y Express, y trabajan en proyectos de desarrollo web de principio a fin.`,
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
      salaryRangeMin: 35000,
      salaryRangeMax: 50000,
      languages: ['Español', "English", "Deutsche"],
      portfolio: ['https://github.com/', "https://gitlab.com/", "https://bitbucket.org/"],
      experience: `Como desarrollador front-end con experiencia, he trabajado en diversos proyectos y etapas del ciclo de desarrollo. Tengo habilidades sólidas en programación, diseño web y colaboración en equipo.

      He creado interfaces de usuario para aplicaciones web y móviles, implementado diseños y funcionalidades, y desarrollado temas personalizados para diferentes plataformas. También he trabajado en estrecha colaboración con diseñadores, desarrolladores de back-end y gestores de proyectos para entregar productos digitales de alta calidad a tiempo.
      
      Me mantengo actualizado en las últimas tendencias y herramientas en tecnología y diseño web, participando en cursos y conferencias para aprender nuevas habilidades. Soy apasionado por la tecnología y la creación de productos digitales que mejoren la vida de las personas.
      
      Estoy comprometido en seguir siendo un profesional altamente capacitado y efectivo en mi trabajo.`,
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: `UpgradeHub: una escuela de tecnología que ofrece programas de formación en desarrollo web y de aplicaciones móviles. En el curso Full Stack Web Development, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, MongoDB, Express, React y Redux.

      Udacity: una plataforma en línea que ofrece cursos de tecnología de pago y gratuitos. En el programa Nanodegree Full Stack Web Developer, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, SQL y MongoDB, y construyen proyectos de aplicaciones web y móviles.
      
      Coursera: una plataforma de aprendizaje en línea que ofrece cursos y programas de grado de universidades y organizaciones en todo el mundo. En el programa de grado en línea de la Universidad de Londres, los estudiantes estudian el desarrollo completo de aplicaciones web utilizando tecnologías como HTML, CSS, JavaScript, Node.js y React.
      
      Fullstack Academy: una escuela de tecnología que ofrece cursos intensivos en desarrollo web y móvil. En el programa Full Stack Web Development, los estudiantes aprenden JavaScript, React, Node.js, Express y MongoDB, y trabajan en proyectos de desarrollo web y móvil.
      
      General Assembly: una escuela de tecnología que ofrece cursos de formación en desarrollo web, diseño y marketing digital. En el curso de desarrollo web a tiempo completo, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, React, MongoDB y Express, y trabajan en proyectos de desarrollo web de principio a fin.`,
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
      salaryRangeMin: 35000,
      salaryRangeMax: 50000,
      languages: ['Español', "English", "Deutsche"],
      portfolio: ['https://github.com/', "https://gitlab.com/", "https://bitbucket.org/"],
      experience: `Como desarrollador front-end con experiencia, he trabajado en diversos proyectos y etapas del ciclo de desarrollo. Tengo habilidades sólidas en programación, diseño web y colaboración en equipo.

      He creado interfaces de usuario para aplicaciones web y móviles, implementado diseños y funcionalidades, y desarrollado temas personalizados para diferentes plataformas. También he trabajado en estrecha colaboración con diseñadores, desarrolladores de back-end y gestores de proyectos para entregar productos digitales de alta calidad a tiempo.
      
      Me mantengo actualizado en las últimas tendencias y herramientas en tecnología y diseño web, participando en cursos y conferencias para aprender nuevas habilidades. Soy apasionado por la tecnología y la creación de productos digitales que mejoren la vida de las personas.
      
      Estoy comprometido en seguir siendo un profesional altamente capacitado y efectivo en mi trabajo.`,
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: `UpgradeHub: una escuela de tecnología que ofrece programas de formación en desarrollo web y de aplicaciones móviles. En el curso Full Stack Web Development, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, MongoDB, Express, React y Redux.

      Udacity: una plataforma en línea que ofrece cursos de tecnología de pago y gratuitos. En el programa Nanodegree Full Stack Web Developer, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, SQL y MongoDB, y construyen proyectos de aplicaciones web y móviles.
      
      Coursera: una plataforma de aprendizaje en línea que ofrece cursos y programas de grado de universidades y organizaciones en todo el mundo. En el programa de grado en línea de la Universidad de Londres, los estudiantes estudian el desarrollo completo de aplicaciones web utilizando tecnologías como HTML, CSS, JavaScript, Node.js y React.
      
      Fullstack Academy: una escuela de tecnología que ofrece cursos intensivos en desarrollo web y móvil. En el programa Full Stack Web Development, los estudiantes aprenden JavaScript, React, Node.js, Express y MongoDB, y trabajan en proyectos de desarrollo web y móvil.
      
      General Assembly: una escuela de tecnología que ofrece cursos de formación en desarrollo web, diseño y marketing digital. En el curso de desarrollo web a tiempo completo, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, React, MongoDB y Express, y trabajan en proyectos de desarrollo web de principio a fin.`,
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
      salaryRangeMin: 35000,
      salaryRangeMax: 50000,
      languages: ['Español', "English", "Deutsche"],
      portfolio: ['https://github.com/', "https://gitlab.com/", "https://bitbucket.org/"],
      experience: `Como desarrollador front-end con experiencia, he trabajado en diversos proyectos y etapas del ciclo de desarrollo. Tengo habilidades sólidas en programación, diseño web y colaboración en equipo.

      He creado interfaces de usuario para aplicaciones web y móviles, implementado diseños y funcionalidades, y desarrollado temas personalizados para diferentes plataformas. También he trabajado en estrecha colaboración con diseñadores, desarrolladores de back-end y gestores de proyectos para entregar productos digitales de alta calidad a tiempo.
      
      Me mantengo actualizado en las últimas tendencias y herramientas en tecnología y diseño web, participando en cursos y conferencias para aprender nuevas habilidades. Soy apasionado por la tecnología y la creación de productos digitales que mejoren la vida de las personas.
      
      Estoy comprometido en seguir siendo un profesional altamente capacitado y efectivo en mi trabajo.`,
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: `UpgradeHub: una escuela de tecnología que ofrece programas de formación en desarrollo web y de aplicaciones móviles. En el curso Full Stack Web Development, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, MongoDB, Express, React y Redux.

      Udacity: una plataforma en línea que ofrece cursos de tecnología de pago y gratuitos. En el programa Nanodegree Full Stack Web Developer, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, SQL y MongoDB, y construyen proyectos de aplicaciones web y móviles.
      
      Coursera: una plataforma de aprendizaje en línea que ofrece cursos y programas de grado de universidades y organizaciones en todo el mundo. En el programa de grado en línea de la Universidad de Londres, los estudiantes estudian el desarrollo completo de aplicaciones web utilizando tecnologías como HTML, CSS, JavaScript, Node.js y React.
      
      Fullstack Academy: una escuela de tecnología que ofrece cursos intensivos en desarrollo web y móvil. En el programa Full Stack Web Development, los estudiantes aprenden JavaScript, React, Node.js, Express y MongoDB, y trabajan en proyectos de desarrollo web y móvil.
      
      General Assembly: una escuela de tecnología que ofrece cursos de formación en desarrollo web, diseño y marketing digital. En el curso de desarrollo web a tiempo completo, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, React, MongoDB y Express, y trabajan en proyectos de desarrollo web de principio a fin.`,
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
      salaryRangeMin: 35000,
      salaryRangeMax: 50000,
      languages: ['Español', "English", "Deutsche"],
      portfolio: ['https://github.com/', "https://gitlab.com/", "https://bitbucket.org/"],
      experience: `Como desarrollador front-end con experiencia, he trabajado en diversos proyectos y etapas del ciclo de desarrollo. Tengo habilidades sólidas en programación, diseño web y colaboración en equipo.

      He creado interfaces de usuario para aplicaciones web y móviles, implementado diseños y funcionalidades, y desarrollado temas personalizados para diferentes plataformas. También he trabajado en estrecha colaboración con diseñadores, desarrolladores de back-end y gestores de proyectos para entregar productos digitales de alta calidad a tiempo.
      
      Me mantengo actualizado en las últimas tendencias y herramientas en tecnología y diseño web, participando en cursos y conferencias para aprender nuevas habilidades. Soy apasionado por la tecnología y la creación de productos digitales que mejoren la vida de las personas.
      
      Estoy comprometido en seguir siendo un profesional altamente capacitado y efectivo en mi trabajo.`,
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: `UpgradeHub: una escuela de tecnología que ofrece programas de formación en desarrollo web y de aplicaciones móviles. En el curso Full Stack Web Development, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, MongoDB, Express, React y Redux.

      Udacity: una plataforma en línea que ofrece cursos de tecnología de pago y gratuitos. En el programa Nanodegree Full Stack Web Developer, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, SQL y MongoDB, y construyen proyectos de aplicaciones web y móviles.
      
      Coursera: una plataforma de aprendizaje en línea que ofrece cursos y programas de grado de universidades y organizaciones en todo el mundo. En el programa de grado en línea de la Universidad de Londres, los estudiantes estudian el desarrollo completo de aplicaciones web utilizando tecnologías como HTML, CSS, JavaScript, Node.js y React.
      
      Fullstack Academy: una escuela de tecnología que ofrece cursos intensivos en desarrollo web y móvil. En el programa Full Stack Web Development, los estudiantes aprenden JavaScript, React, Node.js, Express y MongoDB, y trabajan en proyectos de desarrollo web y móvil.
      
      General Assembly: una escuela de tecnología que ofrece cursos de formación en desarrollo web, diseño y marketing digital. En el curso de desarrollo web a tiempo completo, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, React, MongoDB y Express, y trabajan en proyectos de desarrollo web de principio a fin.`,
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
      salaryRangeMin: 35000,
      salaryRangeMax: 50000,
      languages: ['Español', "English", "Deutsche"],
      portfolio: ['https://github.com/', "https://gitlab.com/", "https://bitbucket.org/"],
      experience: `Como desarrollador front-end con experiencia, he trabajado en diversos proyectos y etapas del ciclo de desarrollo. Tengo habilidades sólidas en programación, diseño web y colaboración en equipo.

      He creado interfaces de usuario para aplicaciones web y móviles, implementado diseños y funcionalidades, y desarrollado temas personalizados para diferentes plataformas. También he trabajado en estrecha colaboración con diseñadores, desarrolladores de back-end y gestores de proyectos para entregar productos digitales de alta calidad a tiempo.
      
      Me mantengo actualizado en las últimas tendencias y herramientas en tecnología y diseño web, participando en cursos y conferencias para aprender nuevas habilidades. Soy apasionado por la tecnología y la creación de productos digitales que mejoren la vida de las personas.
      
      Estoy comprometido en seguir siendo un profesional altamente capacitado y efectivo en mi trabajo.`,
      hardSkills: ["HTML","CSS","JavaScript","Angular","ReactJs","PHP","Symphony","MySql","NodeJs"],
      softSkills: ["Trabajo en equipo","Proactividad","Resolución de problemas","Colaboración","Gestión del tiempo","Flexibilidad"],
      education: `UpgradeHub: una escuela de tecnología que ofrece programas de formación en desarrollo web y de aplicaciones móviles. En el curso Full Stack Web Development, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, MongoDB, Express, React y Redux.

      Udacity: una plataforma en línea que ofrece cursos de tecnología de pago y gratuitos. En el programa Nanodegree Full Stack Web Developer, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, SQL y MongoDB, y construyen proyectos de aplicaciones web y móviles.
      
      Coursera: una plataforma de aprendizaje en línea que ofrece cursos y programas de grado de universidades y organizaciones en todo el mundo. En el programa de grado en línea de la Universidad de Londres, los estudiantes estudian el desarrollo completo de aplicaciones web utilizando tecnologías como HTML, CSS, JavaScript, Node.js y React.
      
      Fullstack Academy: una escuela de tecnología que ofrece cursos intensivos en desarrollo web y móvil. En el programa Full Stack Web Development, los estudiantes aprenden JavaScript, React, Node.js, Express y MongoDB, y trabajan en proyectos de desarrollo web y móvil.
      
      General Assembly: una escuela de tecnología que ofrece cursos de formación en desarrollo web, diseño y marketing digital. En el curso de desarrollo web a tiempo completo, los estudiantes aprenden HTML, CSS, JavaScript, Node.js, React, MongoDB y Express, y trabajan en proyectos de desarrollo web de principio a fin.`,
      typeJob: "Full Remote",
      movility: true
    },
    
  ]
  ;

// Iterar sobre la lista de developer y hashear las contraseñas
developersList.forEach((developer) => {
  const saltRounds = 10; // número de rondas de hash para bcrypt
  const hashedPassword = bcrypt.hashSync(developer.password, saltRounds); // hashear la contraseña
  developer.password = hashedPassword; // reemplazar la contraseña sin hashear con la hasheada
});

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
