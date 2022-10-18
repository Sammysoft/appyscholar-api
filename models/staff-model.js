import mongoose from "mongoose";

const staffSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String },
  password: { type: String },
  email: { type: String },
  gender: { type: String },
  maritalstatus: { type: String },
  subjects: [{ type: String }],
  role: { type: String },
  classRole: { type: String },
  profilepicture: { type: String },
  phonenumber: { type: String },
});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
