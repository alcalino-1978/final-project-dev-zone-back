const mongoose = require('mongoose');

mongoose.set('debug', true)
const Schema = mongoose.Schema;

const salaryRangeSchema = new Schema({
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  });

const jobSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true }, 
        company: [{
            type: mongoose.Types.ObjectId, ref: 'Company', required: true
        }],
        salaryRange: { type: salaryRangeSchema, required: true },
        hiring: {
            shift: { type: String, required: true, enum: ['Full-Time', 'Part-Time', 'Reduced', 'Split Day', 'Rotating'] },
            contract: { type: String, required: true, enum: ['Indefinite-Term', 'Fixed-Term', 'Training'] }
        },
        offerStatus: { type: Boolean, required: true },
        typeJob: { type: String, required: true, enum: ['Full Remote', 'Hybrid', 'Presential'] },
        vacancies: { type: Number, required: true, min: 0 },
        applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developer' }],
        keywords : { type: [String], required: true }
    },
    {
        timestamps: true,
    }
  );
  
  const JobOffer = mongoose.model('JobOffer', jobSchema);
  module.exports = JobOffer;