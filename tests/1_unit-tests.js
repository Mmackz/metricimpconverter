const chai = require("chai");
const { suite } = require("mocha");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

const convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
   suite("convertHandler() outputs", () => {
      suite(".getNum() outputs", () => {
         test("whole number input", (done) => {
            const input = "1kg";
            assert.strictEqual(
               convertHandler.getNum(input),
               1,
               "should correctly read a whole number input"
            );
            done();
         });

         test("read a decimal number input", (done) => {
            const input = "1.1kg";
            assert.strictEqual(
               convertHandler.getNum(input),
               1.1,
               "should correctly read a decimal number input"
            );
            done();
         });

         test("read a fractional input", (done) => {
            const input = "1/2km";
            assert.strictEqual(
               convertHandler.getNum(input),
               0.5,
               "should correctly read a fractional input"
            );
            done();
         });

         test("read a fractional input with a decimal", (done) => {
            const input = "2.4/2km";
            assert.strictEqual(
               convertHandler.getNum(input),
               1.2,
               "should correctly read a fractional input with a decimal"
            );
            done();
         });

         test("return NaN on a double-fraction (i.e. 3/2/3)", (done) => {
            const input = "4/2/2km";
            assert.isNaN(convertHandler.getNum(input), "should return NaN");
            done();
         });

         test("default to a numerical input of 1 when no numerical input is provided", (done) => {
            const input = "mi";
            assert.strictEqual(
               convertHandler.getNum(input),
               1,
               "default to 1 when no numerical input provided"
            );
            done();
         });
      });
      suite(".getUnit() outputs", () => {
         test("read each valid input unit", (done) => {
            const validUnits = ["mi", "km", "gal", "l", "lbs", "kg"];
            const inputs = [
               "1KM",
               "1.2mI",
               "32l",
               "123L",
               "km",
               "1/2Gal",
               "1/4gal",
               "2lbs",
               "4/5.5LBS",
               "1KG",
               "3kg"
            ];
            inputs.forEach((input) =>
               assert.isTrue(
                  validUnits.includes(convertHandler.getUnit(input)),
                  "invalid input: " + input
               )
            );
            done();
         });

         test("return null for an invalid input unit", (done) => {
            const input = "1mile";
            assert.isNull(convertHandler.getUnit(input));
            done();
         });
      });
      suite(".getReturnUnit() outputs", () => {
         test("return the correct return unit for each valid input unit", (done) => {
            const units = ["mi", "km", "gal", "l", "lbs", "kg"];
            const returnUnits = ["km", "mi", "l", "gal", "kg", "lbs"];
            units.forEach((unit, i) =>
               assert.strictEqual(
                  convertHandler.getReturnUnit(unit),
                  returnUnits[i],
                  "incorrect return unit"
               )
            );
            done();
         });
      });
      suite(".spellOutUnit() outputs", () => {
         test("return the spelled-out string unit for each valid input unit", (done) => {
            const units = ["mi", "km", "gal", "l", "lbs", "kg"];
            const fullname = ["mile", "kilometer", "gallon", "liter", "pound", "kilogram"];
            units.forEach((unit, i) =>
               assert.strictEqual(convertHandler.spellOutUnit(unit), fullname[i])
            );
            done();
         });
      });
      suite(".convert() outputs", () => {
         test("correctly convert gal to L", (done) => {
            assert.approximately(convertHandler.convert(1, "gal"), 3.7854, 0.0001);
            assert.approximately(convertHandler.convert(0.26415, "gal"), 1, 0.0001);
            assert.approximately(convertHandler.convert(3.14, "gal"), 11.8862, 0.0001);
            done();
         });

         test("correctly convert L to gal", (done) => {
            assert.approximately(convertHandler.convert(1, "l"), 0.2642, 0.0001);
            assert.approximately(convertHandler.convert(40, "l"), 10.5669, 0.0001);
            assert.approximately(convertHandler.convert(3.14, "l"), 0.8295, 0.0001);
            done();
         });

         test("correctly convert mi to km", (done) => {
            assert.approximately(convertHandler.convert(1, "mi"), 1.6093, 0.0001);
            assert.approximately(convertHandler.convert(4, "mi"), 6.4374, 0.0001);
            assert.approximately(convertHandler.convert(3.14, "mi"), 5.0533, 0.0001);
            done();
         });

         test("correctly convert km to mi", (done) => {
            assert.approximately(convertHandler.convert(1, "km"), 0.6214, 0.0001);
            assert.approximately(convertHandler.convert(4, "km"), 2.4855, 0.0001);
            assert.approximately(convertHandler.convert(3.14, "km"), 1.9511, 0.0001);
            done();
         });

         test("correctly convert lbs to kg", (done) => {
            assert.approximately(convertHandler.convert(1, "lbs"), 0.4536, 0.0001);
            assert.approximately(convertHandler.convert(40, "lbs"), 18.1437, 0.0001);
            assert.approximately(convertHandler.convert(3.14, "lbs"), 1.4243, 0.0001);
            done();
         });

         test("correctly convert kg to lbs", (done) => {
            assert.approximately(convertHandler.convert(1, "kg"), 2.2046, 0.0001);
            assert.approximately(convertHandler.convert(4, "kg"), 8.8185, 0.0001);
            assert.approximately(convertHandler.convert(3.14, "kg"), 6.9225, 0.0001);
            done();
         });
      });
   });
});
