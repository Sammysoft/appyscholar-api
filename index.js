import express from "express";
import _connectDB from "./config/db.js";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import puppeteer from "puppeteer";
import cors from "cors";
import dotenv from "dotenv";
import staffController from "./controllers/staff-controller.js";
import subjectController from "./controllers/subject-controller.js";
import studentController from "./controllers/student-controller.js";
import termRouter from "./controllers/term-controller.js";
import "./config/passport.js";

dotenv.config();
const app = express();

app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_ATLAS,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", subjectController);
app.use("/api", staffController);
app.use("/api", studentController);
app.use("/api", termRouter);

//Result Generation

app.get("/api/results/:id", async (req, res) => {
  const url = `https://results.oladelegroupofschools.com/student/result/${req.params.id}`;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const webPage = await browser.newPage();
  await webPage.goto(url, {
    waitUntil: "networkidle0",
  });

  const pdf = await webPage.pdf({
    printBackground: true,
    format: "A4",
    margin: {
      top: "0px",
      bottom: "0px",
      left: "0px",
      right: "0px",
    },
  });
  await browser.close();
  res.contentType("application/pdf");
  res.send(pdf);
});

const port = process.env.PORT || 9096;
app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
  _connectDB();
});
