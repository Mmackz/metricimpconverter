"use strict";
const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
   const convertHandler = new ConvertHandler();
   app.get("/api/convert", (req, res, next) => {
      // make sure input query is included in request
      if (!Object.keys(req.query).includes("input")) {
         return next("No input parameter found in query. Example: /api/convert?input=kg ");
      }

      const inputString = req.query.input;
      let unit = convertHandler.getUnit(inputString);
      const initVal = convertHandler.getNum(inputString);

      // if either input is invalid, return error
      if (unit === null || isNaN(initVal)) {
         if (unit === null && isNaN(initVal)) {
            res.send("invalid number and unit");
         } else if (unit === null) {
            res.send("invalid unit");
         } else {
            res.send("invalid number");
         }
      } else {
         let returnUnit = convertHandler.getReturnUnit(unit);
         const returnNum = convertHandler.convert(initVal, unit);
         const string = convertHandler.getString(initVal, unit, returnNum, returnUnit);

         if (unit === "l") {
            unit = "L";
         }
         if (returnUnit === "l") {
            returnUnit = "L";
         }

         res.json({ initNum: initVal, initUnit: unit, returnNum, returnUnit, string });
      }
   });
};
