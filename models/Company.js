const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema (
    {
        fullName: {
            type: String,
            required: true,
            // enum:['Julius Hibbert', 'Gregory House', 'Meredith Grey', 'Nick Riviera']
        },
        age: { type: Number, required: true },
        gender: { 
            type: String, 
            required: true,
            enum:['Male', 'Female']
        },
        phoneNumber: { type: String },
        email: { type: String, required: true  },
        insurance: { 
            type: [String],
            // required: true,
            enum:['Sanitas', 'Asisa', 'Adeslas', 'DKV', 'Maphre', 'Otros']
        },
        developers: [{ type:mongoose.Schema.Types.ObjectId, ref: "Developer" }],
        user: [{ type:mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true
    }
)

const Company = mongoose.model('Company', companySchema);
module.exports = Company;