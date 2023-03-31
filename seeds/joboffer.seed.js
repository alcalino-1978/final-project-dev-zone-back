const mongoose = require("mongoose");
const { DB_URL } = require('../utils/db');
const Company = require('../models/Company');
const JobOffer = require("../models/JobOffer");

const jobOffersList = [
   {
    title: 'Front-End Developer',
    description: `Are you a Front-End expert, proud of your work and looking for a new challenge that you are passionate about? Do you want to be a part of a talented and innovative development team that is focused on delivering high-quality solutions to clients? If so, we invite you to join If you can develop and maintain responsive web applications using modern front-end frameworks, colwith other engineers and stakeholders to understand requirements and develop solutions while wriclean, efficient, and maintainable code using best practices... Well, good news!! You're perfect offer!
  
    The requirementsa are that you have a:

      - Bachelor's degree in Computer Science or a related field.
      - Proficiency in modern JavaScript frameworks such as React, Angular, or Vue.js..
      - Strong knowledge of HTML, CSS, and responsive design.
      - Experience with integrating front-end and back-end code.
      
    We hope to hear from you and join our team!`, 
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
    description: `We are on the look out for a talented and motivated individual with a pasweb development to join our training program for Full Stack Developers. In thyou will receive comprehensive training in front-end and back-end web developwell as exposure to the latest technologies and best practices in the field.
    
    The person we're looking for has to:

      - Participate in a comprehensive training program in full stack web development.
      - CLearn front-end technologies such as HTML, CSS, and JavaScript, as well as popular front-end frameworks such as React or Angular.
      - Learn back-end technologies such as Node.js, Express, and MongoDB, as well as popular back-end frameworks such as Ruby on Rails or Django.
      - Collaborate with other trainees and mentors to complete team projects and individual assignments.
    
    You must have a:

      - Bachelor's degree in Computer Science or a related field.
      - Basic understanding of programming fundamentals and algorithms.
      - Strong problem-solving and analytical skills.
      - Passion for web development and eagerness to learn.
      - Excellent communication and teamwork skills.
    
    If you are passionate about web development and looking to jumpstart your career inexciting field, we encourage you to apply for this training opportunity. Upon succecompletion of the program, you will have the skills and experience necessary to becFull Stack Developer and join our team!!`, 
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
    description: `We are seeking a talented and experienced Back-EDeveloper to join our growing team. In this role, you will be responsibfor designing, developing, and maintaining the back-end of our web applicationensuring they are fast, efficient, and scalable.
    
    Responsibilities:
  
      - Write high-quality, clean, and efficient code that meets business requirements.
      - Design, develop, and maintain the back-end of our web applications using modern web technologies.
      - Collaborate with front-end developers, designers, and other team members to deliver high-quality products.
    
    
    Requirements:
    
      - Bachelor's degree in Computer Science or a related field.
      - Strong proficiency in at least one back-end programming language such as Python, Node.js, or Ruby on Rails.
      - Experience with databases such as MySQL, MongoDB, or PostgreSQL.
      - Experience with RESTful APIs and microservices architecture.`, 
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
    description: `We are seeking a highly motivated and talented software engineer to join our team. As a software engineer, you will work closely with our development team to design, develop, and maintain software applications and systems that meet the needs of our clients.
    
    Responsibilities:
    
      - Design, develop, and maintain software applications and systems.
      - Collaborate with other engineers and stakeholders to understand requirements and develop solutions.
      - Write clean, efficient, and maintainable code using best practices.
    
    Requirements:
    
      - Bachelor's degree in Computer Science or a related field.
      - Strong proficiency in at least one programming language, such as Java, Python, or C++.
      - Experience with software development methodologies, such as Agile or Scrum.`, 
    salaryRange: {
        min: 47000,
        max: 50000,
    },
    hiring: {
        shift: 'Part-Time',
        contract: 'Fixed-Term'
    },
    offerStatus: false,
    typeJob: 'Full Remote' ,
    vacancies: 2,
    applicants: [],
    keywords: [
      'software engineer',
      'java',
      'c++'
    ]
    },
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