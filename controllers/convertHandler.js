const validUnits = [
   ["lbs", "kg"],
   ["mi", "km"],
   ["gal", "l"]
];

function truncateNum(num) {
   return +parseFloat(num).toFixed(5);
}

function ConvertHandler() {
   this.getNum = function (input) {
      const inputUnit = /[a-z]+$/i.exec(input);
      let inputNum = inputUnit ? input.substring(0, inputUnit.index) : input;

      // if no number provided, set to default of 1
      if (inputNum === "") {
         inputNum = 1;
      }

      // check inputNum for "/" (division sign) and split into 2 inputs if found
      if (/\//.test(inputNum)) {
         const input1 = inputNum.slice(0, inputNum.match(/\//).index);
         const input2 = inputNum.slice(inputNum.match(/\//).index + 1);
         inputNum = input1 / input2;
      }
      return Number(inputNum);
   };

   this.getUnit = function (input) {
      const inputUnit = /[a-z]+$/i.exec(input.toLowerCase());
      if (inputUnit === null || !validUnits.flat().includes(inputUnit[0])) {
         return null;
      }
      return inputUnit[0];
   };

   this.getReturnUnit = function (initUnit) {
      // return opposite value in sub-array (found in validUnits array)
      const arr = validUnits[validUnits.findIndex((arr) => arr.includes(initUnit))];
      return arr[Math.abs(arr.findIndex((unit) => unit === initUnit) - 1)];
   };

   this.spellOutUnit = function (unit) {
      switch (unit) {
         case "lbs":
            return "pound";
         case "kg":
            return "kilogram";
         case "mi":
            return "mile";
         case "km":
            return "kilometer";
         case "gal":
            return "gallon";
         case "l":
            return "liter";
      }
   };

   this.convert = function (initNum, initUnit) {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      switch (initUnit) {
         case "lbs":
            return truncateNum(initNum * lbsToKg);
         case "kg":
            return truncateNum(initNum / lbsToKg);
         case "mi":
            return truncateNum(initNum * miToKm);
         case "km":
            return truncateNum(initNum / miToKm);
         case "gal":
            return truncateNum(initNum * galToL);
         case "l":
            return truncateNum(initNum / galToL);
      }
   };

   this.getString = function (initNum, initUnit, returnNum, returnUnit) {
      const unitFrom = this.spellOutUnit(initUnit);
      const unitTo = this.spellOutUnit(returnUnit);

      return `${initNum} ${
         initNum === 1 ? unitFrom : `${unitFrom}s`
      } converts to ${returnNum} ${returnNum === 1 ? unitTo : `${unitTo}s`}`;
   };
}

module.exports = ConvertHandler;
