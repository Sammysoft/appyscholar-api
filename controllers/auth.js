import jwt from "jsonwebtoken";
import Staff from "../models/staff-model.js";
import bcrypt from "bcrypt";

export const authController = {
  _auth: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!password || !email) {
        res.status(400).json({
          data: "Please provide all fields",
        });
      } else {
        const StaffDetails = await Staff.findOne({ email: email });
        console.log(StaffDetails);
        if (StaffDetails) {
          if (StaffDetails.email === email) {
            bcrypt.compare(password, StaffDetails.password, (err, isMatch) => {
              if (isMatch) {
                const payload = {
                  id: StaffDetails._id,
                  email: StaffDetails.username,
                };
                const accesstoken = jwt.sign(payload, "Appy Scholar", {
                  expiresIn: "2h",
                });

                res.status(200).json({ token: "Bearer " + accesstoken });
              } else {
                res.status(400).json({ data: "Wrong Password!" });
              }
            });
          } else {
            res.status(400).json({
              data: `Are you trying to access ${StaffDetails.username}'s account?, Your password is wrong!`,
            });
          }
        } else {
          res.status(400).json({
            data: "Sorry, this email is not recognized, you may contact support!",
          });
        }
      }
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },
};
