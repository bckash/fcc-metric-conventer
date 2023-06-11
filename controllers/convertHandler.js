function ConvertHandler() {

  // GET NUMBER
  this.getNum = function(input) {
    let result;
    let rgxtillLastNr = /^(.*?\d)/
    let rgxOnlyUnit = /^(gal|l|mi|km|lbs|kg)$/i
    let rgxOnlyNr = /^\d+$/

    let rgxDecimal = /^[+-]?\d+(\.\d+)?/
    let rgxFractional = /^\d+\/\d+/
    let rgxFractDecimal = /^[-+]?(\d+(\.\d+)?|\.\d+)\/[-+]?(\d+(\.\d+)?|\.\d+)/
    let rgxNoNumber = /^[^0-9].*/
    let rgxDoubleFraction = /\/\d+\/\d+/
    let rgxSpecialChar = /^[^a-zA-Z0-9]+/
    let nr;
    
    function matchRGX (rgx) {
      return input.match(rgx)[0]
    }

    if (rgxFractDecimal.test(input)) {
      nr = matchRGX(rgxFractDecimal)
      let splt = nr.split("/");
      let numerator = parseFloat(splt[0]);
      let denominator = parseFloat(splt[1]);
      result = numerator / denominator;

    } else if (rgxFractional.test(input)) {
      console.log("fractional")
      result = matchRGX(rgxFractional)
     
    } else if (rgxDecimal.test(input)) {
      console.log("decimal")
      result = matchRGX(rgxDecimal) 

    } else if (rgxtillLastNr.test(input)) {
      console.log("here")
      let thatPart = matchRGX(rgxOnlyNr)
      thatPart.test(rgxOnlyNr) 
        ? result = matchRGX(rgxNoNumber) 
        : result = "invalid number"

    } else if (rgxOnlyUnit.test(input)) {
      result = 1
    }

    
    return result;
  };

  // GET UNIT
  this.getUnit = function(input) {
    let result;
    let rgx = /[A-Za-z]+$/
    let rgxSpecialCharBefore = /[^a-zA-Z0-9]+[a-zA-Z]/

    if (rgxSpecialCharBefore.test(input)) {

      result = "invalid unit"

    } else if (rgx.test(input)) {

      switch (input.match(rgx)[0].toLowerCase()) {
        case "gal"  :
          result = "gal";
          break;
        case "l" :
          result = "L"
          break;
        case "mi" :
          result = "mi"
          break;
        case "km" :
          result = "km"
          break;
        case "lbs" :
          result = "lbs"
          break;
        case "kg" :
          result = "kg"
          break;
        default : 
          result = "invalid unit"
          break;
      } 

    }
    
    return result;
  };

  // RETURN UNIT
  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit) {
      case "gal" :
        result = "L"
        break;
      case "L" :
        result = "gal"
        break;
      case "mi" :
        result = "km"
        break;
      case "km" :
        result = "mi"
        break;
      case "lbs" :
        result = "kg"
        break;
      case "kg" :
        result = "lbs"
        break;
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };

  // RETURN NUMBER
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "gal" :
        result = parseFloat(initNum)*galToL
        break;
      case "L" :
        result = parseFloat(initNum)/galToL
        break;
      case "mi" :
        result = parseFloat(initNum)*miToKm
        break;
      case "km" :
        result = parseFloat(initNum)/miToKm
        break;
      case "lbs" :
        result = parseFloat(initNum)*lbsToKg
        break;
      case "kg" :
        result = parseFloat(initNum)/lbsToKg
        break;
    }
    if (result)
    return result.toFixed(5);
  };

  // STRING
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let ru;
    let ruOG;

    switch (returnUnit) {
      case "gal" :
        ru = "gallons"
        ruOG = "liters"
        break;
      case "L" :
        ru = "liters"
        ruOG = "gallons"
        break;
      case "mi" :
        ru = "miles"
        ruOG = "kilometers"
        break;
      case "km" :
        ru = "kilometers"
        ruOG = "miles"
        break;
      case "lbs" :
        ru = "pounds"
        ruOG = "kilograms"
        break;
      case "kg" :
        ru = "kilograms"
        ruOG = "pounds"
        break;
    }

    result = initNum + " " + ruOG + " converts to " + returnNum + " " + ru

    return result;
  };
  
}

module.exports = ConvertHandler;
