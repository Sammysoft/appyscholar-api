import Term from "../models/term-model.js";

export const termRoute = {
  _configTerm: async (req, res, next) => {
    try {
      const { juniorfees, seniorfees, nexttermbegins, currterm, year } = req.body;
      const term = await Term.findOne();
      term.juniorfees = juniorfees;
      term.seniorfees = seniorfees;
      term.nexttermbegins = nexttermbegins;
      term.currterm = currterm;
      term.year = year;
      const newTerm = await term.save();
      res.status(200).json({
        data: newTerm,
      });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support" + error,
      });
    }
  },
  _getTerm: async (req, res, next) => {
    try {
      const term = Term.findOne();
      if (term) {
        res.status(200).json({
          data: term,
        });
      } else {
        res.status(200).json({
          data: "Could not fetch data at the moment, please contact support or try again later",
        });
      }
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support",
      });
    }
  },
};
