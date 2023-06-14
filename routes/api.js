'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get( (req, res) => {
      
      let inp = req.query.input
      let getNr = convertHandler.getNum(inp)
      let getUnit = convertHandler.getUnit(inp)
      let returnUnit = convertHandler.getReturnUnit(getUnit)
      let convert = convertHandler.convert(
        convertHandler.getNum(inp), convertHandler.getUnit(inp)
      )
      let stringResult = convertHandler.getString(
        getNr, getUnit, convert, returnUnit
      )
      
      // console.clear()
      console.log("input : "+ inp)
      console.log("initNum = " + getNr)
      console.log("initUnit = " + getUnit)
      console.log("return unit = " + returnUnit)
      console.log("return nr = " + convert)
      console.log("string = " + stringResult)
      console.log("......")
      
      if (getNr === "invalid number" && getUnit === "invalid unit") {
        res.send("invalid number and unit")

      } else if (getUnit === "invalid unit") {
        res.send("invalid unit")

      } else if (getNr === "invalid number") {
        res.send("invalid number")

      } else {
        let initNum = getNr
        let initUnit = getUnit
        let returnNum = convert
        let string = stringResult
        res.json(
          { initNum, initUnit, returnNum, returnUnit, string }
        )
      }
    })
};
