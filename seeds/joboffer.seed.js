const mongoose = require("mongoose");
const { DB_URL } = require('../utils/db');
const Company = require('../models/Company');
const JobOffer = require("../models/JobOffer");

const jobOffersList = [
   {
    title: 'Front-End Developer',
    description: `<p>Are you a Front-End expert, proud of your work and looking 
    for a new challenge that you are passionate about? Do you want to be a part 
    of a talented and innovative development team that is focused on delivering 
    high-quality solutions to clients? If so, we invite you to join our team!</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Develop and maintain responsive web applications using modern front-end frameworks..</li>
      <li>Collaborate with other engineers and stakeholders to understand requirements and develop solutions</li>
      <li>Write clean, efficient, and maintainable code using best practices</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>Bachelor's degree in Computer Science or a related field</li>
      <li>Proficiency in modern JavaScript frameworks such as React, Angular, or Vue.js.</li>
      <li>Strong knowledge of HTML, CSS, and responsive design</li>
      <li>Experience with integrating front-end and back-end code.</li>
    </ul>`, 
    salary_range: {
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
    applicants: []
    },
   {
    title: 'Full-Stack Developer',
    description: `<p>We are on the look out for a talented and motivated individual with a passion for 
    web development to join our training program for Full Stack Developers. In this role, 
    you will receive comprehensive training in front-end and back-end web development, as 
    well as exposure to the latest technologies and best practices in the field.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Participate in a comprehensive training program in full stack web development</li>
      <li>CLearn front-end technologies such as HTML, CSS, and JavaScript, as well as popular front-end frameworks such as React or Angular</li>
      <li>Learn back-end technologies such as Node.js, Express, and MongoDB, as well as popular back-end frameworks such as Ruby on Rails or Django</li>
      <li>Collaborate with other trainees and mentors to complete team projects and individual assignments</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>Bachelor's degree in Computer Science or a related field</li>
      <li>Basic understanding of programming fundamentals and algorithms</li>
      <li>Strong problem-solving and analytical skills</li>
      <li>Passion for web development and eagerness to learn</li>
      <li>Excellent communication and teamwork skills</li>
    </ul>
    
    <p>If you are passionate about web development and looking to jumpstart your career in this 
    exciting field, we encourage you to apply for this training opportunity. Upon successful 
    completion of the program, you will have the skills and experience necessary to become a 
    Full Stack Developer and join our team.</p>`, 
    salary_range: {
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
    applicants: []
    },
    {
    title: 'Back-End Developer',
    description: `<p>We are seeking a talented and experienced Back-End 
    Developer to join our growing team. In this role, you will be responsible 
    for designing, developing, and maintaining the back-end of our web applications, 
    ensuring they are fast, efficient, and scalable.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Write high-quality, clean, and efficient code that meets business requirements</li>
      <li>Design, develop, and maintain the back-end of our web applications using modern web technologies</li>
      <li>Collaborate with front-end developers, designers, and other team members to deliver high-quality products</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>Bachelor's degree in Computer Science or a related field</li>
      <li>Strong proficiency in at least one back-end programming language such as Python, Node.js, or Ruby on Rails</li>
      <li>Experience with databases such as MySQL, MongoDB, or PostgreSQL/li>
      <li>Experience with RESTful APIs and microservices architecture</li>
    </ul>`, 
    salary_range: {
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
    applicants: []
    },
   {
    title: 'Software Engineer',
    description: `<p>We are seeking a highly motivated and talented software engineer 
    to join our team. As a software engineer, you will work closely with our development 
    team to design, develop, and maintain software applications and systems that meet 
    the needs of our clients.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Design, develop, and maintain software applications and systems</li>
      <li>Collaborate with other engineers and stakeholders to understand requirements and develop solutions</li>
      <li>Write clean, efficient, and maintainable code using best practices</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>Bachelor's degree in Computer Science or a related field</li>
      <li>Strong proficiency in at least one programming language, such as Java, Python, or C++</li>
      <li>Experience with software development methodologies, such as Agile or Scrum</li>
    </ul>
    `, 
    salary_range: {
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
    applicants: []
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