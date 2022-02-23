const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
   suite("Integration tests with chai-http", () => {
      test("GET /api/convert with valid input", (done) => {
         chai
            .request(server)
            .get("/api/convert")
            .query({ input: "1kg" })
            .end((err, res) => {
               const { initNum, initUnit, returnNum, returnUnit, string } = res.body;
               assert.equal(res.status, 200, "invalid response");
               assert.equal(initNum, 1);
               assert.equal(initUnit, "kg");
               assert.approximately(returnNum, 2.2046, 0.0001);
               assert.equal(returnUnit, "lbs");
               assert.isString(string);
               assert.equal(string, `1 kilograms converts to ${returnNum} pounds`);
               done();
            });
      });

      test("GET /api/convert with invalid unit", (done) => {
         chai
            .request(server)
            .get("/api/convert")
            .query({ input: "32g" })
            .end((err, res) => {
               assert.equal(res.status, 200, "invalid response");
               assert.equal(res.text, "invalid unit");
               done();
            });
      });

      test("GET /api/convert with invalid number", (done) => {
         chai
            .request(server)
            .get("/api/convert")
            .query({ input: "3/7.2/4kg" })
            .end((err, res) => {
               assert.equal(res.status, 200, "invalid response");
               assert.equal(res.text, "invalid number");
               done();
            });
      });

      test("GET /api/convert with invalid number and unit", (done) => {
         chai
            .request(server)
            .get("/api/convert")
            .query({ input: "3/7.2/4abcd" })
            .end((err, res) => {
               assert.equal(res.status, 200, "invalid response");
               assert.equal(res.text, "invalid number and unit");
               done();
            });
      });

      test("GET /api/convert with no number", (done) => {
         chai
            .request(server)
            .get("/api/convert")
            .query({ input: "kg" })
            .end((err, res) => {
               const { initNum, initUnit, returnNum, returnUnit, string } = res.body;
               assert.equal(res.status, 200, "invalid response");
               assert.equal(initNum, 1);
               assert.equal(initUnit, "kg");
               assert.approximately(returnNum, 2.2046, 0.0001);
               assert.equal(returnUnit, "lbs");
               assert.isString(string);
               assert.equal(string, `1 kilograms converts to ${returnNum} pounds`);
               done();
            });
      });
   });
});
