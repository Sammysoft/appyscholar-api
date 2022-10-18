import express from "express";
import { termRoute } from "../router/term.js";

const termRouter = express.Router();

termRouter.post("/term/config", termRoute._configTerm);
termRouter.get("/term/get", termRoute._getTerm);

export default termRouter;
