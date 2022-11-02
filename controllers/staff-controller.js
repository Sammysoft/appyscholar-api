import express from "express";
import { staffRoute } from "../router/staff.js";
import { authController } from "../controllers/auth.js";
import passport from "passport";
const staffRouter = express.Router();

staffRouter.post("/staffs/add", staffRoute._addStaff);
staffRouter.post("/auth", authController._auth);
staffRouter.get("/staffs/get", staffRoute._getStaffs);
staffRouter.post("/staffs/update/:id", staffRoute._createAccount);
staffRouter.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      data: req.user,
    });
    if (!req.user) {
      res.status(400).json({
        data: "Please Login",
      });
    }
  }
);

staffRouter.post("/batch-transition", staffRoute._batchTransition);
staffRouter.post("/delete/:id", staffRoute._deleteStaff);

export default staffRouter;
