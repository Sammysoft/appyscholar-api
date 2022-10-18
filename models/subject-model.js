import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  text: { type: String },
  studentname: { type: String },
  studentID: { type: String },
  teachername: { type: String },
  studentClass: { type: String },
  studentscores: {
    firsttest: { type: Number, default: 0 },
    secondtest: { type: Number, default: 0 },
    exam: { type: Number, default: 0 },
    tot: { type: Number, default: 0 },
  },
});

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
