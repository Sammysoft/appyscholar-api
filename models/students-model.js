import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  dateofbirth: { type: String },
  studentClass: { type: String },
  subjects: [{ type: String }],
  profilePicture: { type: String },
  comments: {
    principal: { type: String, default: "Nill" },
    classmaster: { type: String, default: "Nill" },
  },
  house: { type: String, default: "None" },
  post: { type: String, default: "Class Member" },
  total: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  position: { type: String, default: "Null" },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
