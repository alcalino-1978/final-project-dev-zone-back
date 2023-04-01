const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const developerSchema = new Schema (
    {
        fullName: { type: String, required: true },
        age: { type: Number, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        image: { type: String, required: true },
        cv: { type: String },
        salaryRangeMin: { type: Number, required: true },
        salaryRangeMax: { type: Number, required: true },
        languages: { type: [String], required: true },
        portfolio: { type: [String], required: true },
        experience: { type: String, required: true },
        hardSkills: { type: [String], required: true },
        softSkills: { type: [String], required: true },
        education: { type: [String], required: true },
        typeJob: { type: String, required: true, enum: ['Full Remote', 'Hybrid', 'Presential'] },
        movility: { type: Boolean },
        jobOffers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer' }]
    },
    {
        timestamps: true
    }
)

const Developer = mongoose.model('Developer', developerSchema);
module.exports = Developer;
