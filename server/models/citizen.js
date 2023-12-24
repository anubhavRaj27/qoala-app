import mongoose from "mongoose";

const CitizenSchema = new mongoose.Schema(
  {
    identification_number:{
      type: Number,
      require: true,
      unique: true,
    },
    name:{
      type: String,
      require: true,
    },
    last_name:{
      type: String,
      require: true,
    },
    date_of_birth:{
      type: Date,
      require: true,
    },
    date_of_issue:{
      type: Date,
      require:true,
    },
    date_of_expiry:{
      type: Date,
      require: true,
    },
    status:{
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);

const Citizen= mongoose.model("Citizen", CitizenSchema);
export default Citizen;