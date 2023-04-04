const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
     /* required: () => {
        return this.registered === true;
      },*/
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    cif:{
      type: String,
      required: true,
    },
    listOffers: [{
      type:  mongoose.Schema.Types.ObjectId, ref: "JobOffer"
      // required: true,
    }],
    numberEmployees: {
      type: Number,
    },

    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Developer" }],
  
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
