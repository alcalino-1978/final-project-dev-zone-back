const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema (
    {
        name: {
            type: String,
            required: true,          
        },
        description:{
            type:String,
            required: true,
        },
        logo: { 
            type:String , 
            required: true 
        },
        listOffers: { 
            type:String , 
            required: true 
        },
        numberEmployees:{
            type:Number,
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