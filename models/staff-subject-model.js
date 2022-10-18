import mongoose from "mongoose";

const staffSubjectSchema = new mongoose.Schema({
  text: { type: String },
});

const StaffSubject = mongoose.model("StaffSubject", staffSubjectSchema);

export default StaffSubject;
