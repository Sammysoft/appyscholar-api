import express from "express";
import { subjectRoute } from "../router/subject.js";

const subjectRouter = express.Router();

subjectRouter.post("/subject/add", subjectRoute._addSubject);
subjectRouter.get("/subject", subjectRoute._getSubject);
subjectRouter.post("/subjects/add", subjectRoute._addSubjects);
subjectRouter.post("/subjects", subjectRoute._getSubjects);
subjectRouter.post("/subjects/addscore", subjectRoute._addScores);
subjectRouter.post("/classes/students/", subjectRoute._getClassStudents);

export default subjectRouter;
