import Student from "../models/students-model.js";
import Subject from "../models/subject-model.js";
import Term from "../models/term-model.js";
export const studentRoute = {
  _addStudent: async (req, res, next) => {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      dateofbirth,
      studentClass,
      subjects,
      profilePicture,
    } = req.body;

    try {
      if (
        !firstname ||
        !lastname ||
        !email ||
        !phonenumber ||
        !dateofbirth ||
        !profilePicture ||
        !subjects ||
        !studentClass
      ) {
        res.status(400).json({
          data: "Please, provide all details",
        });
      } else {
        const student = await new Student();
        student.firstname = firstname;
        student.lastname = lastname;
        student.email = email;
        student.dateofbirth = dateofbirth;
        student.phonenumber = phonenumber;
        student.profilePicture = profilePicture;
        student.studentClass = studentClass;
        student.subjects = subjects;
        const newStudent = await student.save();
        res.status(200).json({
          data: newStudent,
        });
      }
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },

  _getStudents: async (req, res, next) => {
    const allStudents = await Student.find();
    try {
      res.status(200).json({
        data: allStudents,
      });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },

  _addComments: async (req, res, next) => {
    try {
      const { principal, classmaster, total, percentage, position } = req.body;
      console.log(req.body);
      if (principal) {
        const student = await Student.findById({ _id: req.params.id });
        student.comments.principal = principal;
        student.position = position;
        const newStudent = await student.save();
        res.status(200).json({
          data: newStudent,
        });
      } else if (classmaster) {
        const student = await Student.findOne({ _id: req.params.id });
        student.total = total;
        student.percentage = percentage;
        student.comments.classmaster = classmaster;
        const newStudent = await student.save();
        res.status(200).json({
          data: newStudent,
        });
      }
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },

  _getStudentInAClass: async (req, res, next) => {
    const { data } = req.body;
    console.log(data);
    try {
      const subject = await Subject.find({
        studentClass: data,
      });
      const students = await Student.find({ studentClass: data });
      if (students) {
        res.status(200).json({
          data: students,
          scores: subject,
        });
      } else {
        res.status(400).json({
          data: `Could not get students in ${data}`,
        });
      }
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },

  _updateStudent: async (req, res, next) => {
    try {
      const {
        subjects,
        studentClass,
        firstname,
        lastname,
        picture,
        email,
        phonenumber,
      } = req.body;
      const student = await Student.findById({ _id: req.params.id });
      if (student) {
        student.firstname = firstname;
        student.lastname = lastname;
        student.studentClass = studentClass;
        student.profilePicture = picture;
        student.phonenumber = phonenumber;
        student.email = email;
        student.lastname = lastname;
        student.subjects = subjects;
        student.save();
        res.status(200).json({
          data: `updated ${firstname} ${lastname}'s record succesfully`,
        });
      }
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },

  _getAStudent: async (req, res, next) => {
    try {
      Student.findById({ _id: req.params.id }, (err, student) => {
        res.status(200).json({
          data: student,
        });
      });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },

  _generateResult: async (req, res, next) => {
    try {
      const student = await Student.findById({ _id: req.params.id });
      const term = await Term.findOne();
      const scores = await Subject.find({
        studentname: `${student.firstname} ${student.lastname}`,
      });
      res.status(200).json({
        student,
        scores,
        term,
      });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },

  _updateSubjects: async (req, res, next) => {
    const { studentname, subjects, studentClass } = req.body;
    const payload = {
      studentname,
      studentscores: subjects,
      studentClass,
    };
    try {
      Subject.find(
        {
          studentname: studentname,
          studentClass: studentClass,
        },
        payload,
        (err, student) => {
          if (!err) {
            res.status(200).json({
              data: `${student.studentname}'s has just been updated`,
            });
          } else {
            res.status(400).json({
              data: "Internal  Server Error, please contact support",
            });
          }
        }
      );
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },
};
