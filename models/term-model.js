import mongoose from "mongoose";

const termSchema = mongoose.Schema({
  juniorfees: { type: String },
  seniorfees: { type: String },
  nexttermbegins: { type: String },
  currterm: { type: String },
  year:{type:String}
});

const Term = mongoose.model("Term", termSchema);

export default Term;
