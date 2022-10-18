import express from "express";
import { studentRoute } from "../router/student.js";

const studentController = express.Router();

studentController.post("/students/add", studentRoute._addStudent);
studentController.get("/students/", studentRoute._getStudents);
studentController.post("/students/class", studentRoute._getStudentInAClass);
studentController.post("/student/update/:id", studentRoute._updateStudent);
studentController.get("/student/get/:id", studentRoute._getAStudent);
studentController.post("/student/comment/:id", studentRoute._addComments);
studentController.get("/students/result/:id", studentRoute._generateResult);
studentController.post("/students/update", studentRoute._updateSubjects);

export default studentController;
