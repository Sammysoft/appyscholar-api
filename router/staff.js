import Staff from "../models/staff-model.js";
import bcrypt from "bcrypt";
import { sendMail } from "../config/mail-service.js";

export const staffRoute = {
  _addStaff: async (req, res, next) => {
    const { firstname, lastname, role, classRole, email, gender, subjects } =
      req.body;
    try {
      if (!firstname || !lastname || !email || !gender || !role || !subjects) {
        res.status(400).json({
          msg: "Please provide all details!",
        });
      } else {
        const staff = new Staff();
        staff.firstname = firstname;
        staff.lastname = lastname;
        staff.email = email;
        staff.gender = gender;
        staff.role = role;
        staff.classRole = classRole;
        staff.subjects = subjects;
        staff.save();
        const senderMail =
          "Oladele Group Of Schools <oladelegroupofschools@gmail.com>";
        const name = `${firstname} ${lastname}`;
        const recieverMail = `${email}`;
        const text = `<b>Hello ${firstname}</b>`;
        const subject = `Activate Your Account`;
        const body = `Your account has just been successfully created on Oladele Group of Schools' result systems platform.<br/>
                              However, you are demanded to verify your email address before you can access your account. To activate your account,
                              kindly click on this link <a href="https://results.oladelegroupofschools.com/account/settings/${staff._id}">Activate Your Account</a> To setup fully!
                              <br/>For more enquiries contact +234 906 454 5706, You may also reply this email.
                   `;
        sendMail(senderMail, recieverMail, subject, text, name, body, (err) => {
          if (err) {
            console.log("Mail Not Sent");
          } else {
            console.log("Mail Sent");
          }
        });
        res.status(200).json({
          data: staff,
        });
      }
    } catch (error) {
      res.status(400).json({
        msg: "Internal Server Error, Please contact support!",
      });
    }
  },

  _createAccount: async (req, res, next) => {
    const {
      firstname,
      lastname,
      username,
      email,
      phonenumber,
      password,
      profilepicture,
      maritalstatus,
    } = req.body;

    try {
      if (
        firstname === "" ||
        lastname === "" ||
        username === null ||
        email === "" ||
        phonenumber === "" ||
        password === null ||
        profilepicture === "" ||
        maritalstatus === ""
      ) {
        res.status(400).json({
          data: "Please provide all details before making any updates",
        });
      } else {
        const staff = await Staff.findById({ _id: req.params.id });
        staff.firstname = firstname;
        staff.lastname = lastname;
        staff.username = username;
        staff.maritalstatus = maritalstatus;
        staff.profilepicture = profilepicture;
        staff.email = email;
        staff.phonenumber = phonenumber;
        bcrypt.genSalt(10, (err, salt) => {
          if (!err) {
            bcrypt.hash(password, salt, async (err, hash) => {
              staff.password = hash;
              const newStaff = await staff.save();
              return res.status(200).json({
                data: newStaff,
              });
            });
          } else {
            return res.status(400).json({
              data: "Could not secure password, please contact support",
            });
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, Please Contact Support",
      });
    }
  },

  _getStaffs: async (req, res, next) => {
    try {
      const staffs = await Staff.find();
      res.status(200).json({
        data: staffs,
      });
    } catch (error) {
      res.status(400).json({
        data: "Staffs could not be fetched!",
      });
    }
  },
};
