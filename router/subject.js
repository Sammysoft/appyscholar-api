import Subject from "../models/subject-model.js";
import StaffSubject from "../models/staff-subject-model.js";
import Term from "../models/term-model.js";

export const subjectRoute = {
  _addSubjects: async (req, res, next) => {
    try {
      let myArray = [];
      const { lastname, firstname, subjects, studentID, studentClass } =
        req.body;
      const term = await Term.findOne();
      console.log(term);
      subjects.selectedSubjects.map(async (sub) => {
        const oneSubject = await new Subject();
        oneSubject.term = `${term.currterm} Term ${term.year}`;
        oneSubject.text = sub;
        oneSubject.studentClass = studentClass;
        oneSubject.studentID = studentID;
        oneSubject.studentname = `${firstname} ${lastname}`;
        myArray.push(oneSubject);
        oneSubject.save();
      });
      res.status(200).json({
        data: `${firstname} ${lastname} has been fully registered 🤓`,
      });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },

  _getSubject: async (req, res, next) => {
    try {
      const subject = await StaffSubject.find();
      res.status(200).json({
        data: subject,
      });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },

  _addSubject: async (req, res, next) => {
    const { subject } = req.body;

    try {
      const newSubject = await new StaffSubject();
      newSubject.text = subject;
      newSubject.save();
      res.status(200).json({
        data: newSubject,
      });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },

  _getSubjects: async (req, res, next) => {
    try {
      const { studentname, term } = req.body;
      console.log(studentname);
      const subject = await Subject.find({
        studentname: studentname,
        term: term,
      });
      console.log(subject);
      res.status(200).json({
        data: subject,
      });
    } catch (error) {
      res.status(400).json({
        msg: "Error in retrieving Subjects",
      });
    }
  },

  _addScores: async (req, res, next) => {
    try {
      const { term, subject, firstCA, secondCA, exam, total, studentname } =
        req.body;

      let studentSubject = subject.split(" ")[0];
      let studentClass =
        subject.split(" ")[1].slice(1) +
        " " +
        subject.split(" ")[2].slice(0, -1);
      console.log(studentSubject, studentClass);

      const payload = {
        firsttest: Number(firstCA),
        secondtest: Number(secondCA),
        exam: Number(exam),
        tot: total,
      };

      let scores = await Subject.findOne({
        studentname: studentname,
        text: studentSubject,
        term: term,
      });

      if (!scores) {
        res.status(400).json({ data: "No result found!" });
      } else {
        scores.studentscores = payload;
        const newScores = await scores.save();
        res.status(200).json({ data: newScores.studentscores });
      }
    } catch (error) {
      res.status(200).json({ data: "Error" });
    }
  },

  _getClassStudents: async (req, res, next) => {
    const { value } = req.body;
    let studentSubject = value.split(" ")[0];
    let studentClass =
      value.split(" ")[1].slice(1) + " " + value.split(" ")[2].slice(0, -1);

    const term = await Term.findOne();
    try {
      const classStudents = await Subject.find({
        text: studentSubject,
        studentClass: studentClass,
        term: `${term.currterm} Term ${term.year}`,
      });
      res.status(200).json({
        data: classStudents,
      });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },
};
