const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const developerSchema = new Schema (
    {
        fullName: { type: String, required: true },
        age: { type: Number, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        password: { 
            type: String,
            required: () => {
                return this.registered === true;
            }
         },
        photo: { type: String, required: true },
        cv: { type: String },
        salary: { type: String, required: true },
        languages: { type: [String], required: true },
        portfolio: { type: [String], required: true },
        experience: { type: String, required: true },
        hardSkills: { type: [String], required: true },
        softSkills: { type: [String], required: true },
        education: { type: [String], required: true },
        typeJob: { type: String, required: true, enum: ['Full Remote', 'Hybrid', 'Presential'] },
        movility: { type: Boolean },
        company: { type:mongoose.Schema.Types.ObjectId, ref: "Company" },
    },
    {
        timestamps: true
    }
)

const Developer = mongoose.model('Developer', developerSchema);
module.exports = Developer;