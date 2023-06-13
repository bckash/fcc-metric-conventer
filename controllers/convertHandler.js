function ConvertHandler() {

  // GET NUMBER
  this.getNum = function(input) {
    let result;
    let rgxOnlyUnit = /^(gal|l|mi|km|lbs|kg)$/i
    let rgxNr = /^\d.*\d/
    let rgx1Nr = /^\d(?!.*\d)/
    let rgxSpecialCharAfterNr = /\d[^\w\s]/
    let rgxDoubleFraction = /\/\d+\//
    let rgxFractDecimal = /^[-+]?(\d+(\.\d+)?|\.\d+)\/[-+]?(\d+(\.\d+)?|\.\d+)/
    let rgxDecimal = /^\d+(\.\d+)/
    let rgxFractional = /^\d+\/\d+/
    let rgxOnlyNr = /^\d+$/
    let invld = "invalid number"
    
    function matchRGX (rgx) {
      let inpt = input
      return inpt.match(rgx)[0]
    }

    // only one number at the beginning
    if (rgx1Nr.test(input)) {
      
      rgxSpecialCharAfterNr.test(input)
        ? result = invld
        : result = matchRGX(rgx1Nr)
        
    // potential "number phrase" - starting and finishing with a number   
    } else if (rgxNr.test(input)) {
      let nr = matchRGX(rgxNr)
      // a) double fraction
      if (rgxDoubleFraction.test(input)) {
        result = invld
      // b) fractional and decimal 
      } else if (rgxFractDecimal.test(input)) {
        nr = matchRGX(rgxFractDecimal)
        let splt = nr.split("/");
        let numerator = parseFloat(splt[0]);
        let denominator = parseFloat(splt[1]);
        result = numerator / denominator;
      // C) fractional
      } else if (rgxFractional.test(input)) {
        result = matchRGX(input, rgxFractional)
      // d) decimal
      } else if (rgxDecimal.test(input)) {
        result = matchRGX(rgxDecimal)
      // f) whole number (with check if any special char after)
      } else if (rgxOnlyNr.test(nr)) {
        rgxSpecialCharAfterNr.test(input)
        ? result = invld
        : result = result = matchRGX(nr)
      // all else = invalid  
      } else {
        result = invld
      }
    
    // no correct number or only unit
    } else {
      rgxOnlyUnit.test(input) ? result = 1 : result = invld
    }

    return result;
  };

  // GET UNIT
  this.getUnit = function(input) {
    let result;
    let rgx = /[A-Za-z]+$/
    let rgxSpecialCharBefore = /[^a-zA-Z0-9]+[a-zA-Z]/
    let rgxUnitAtEnd = /(.*)(gal|l|mi|km|lbs|kg)$/i

    let unit = input.match(rgxUnitAtEnd)[2]
    console.log("unit = " + unit)

    if (unit.length > 0) {
      console.log("unit")
    } else {
      result = "invalid unit"
    }

    
    return result;
  };

  // RETURN UNIT
  // this.getReturnUnit = function(initUnit) {
  //   let result;

  //   switch (initUnit) {
  //     case "gal" :
  //       result = "L"
  //       break;
  //     case "L" :
  //       result = "gal"
  //       break;
  //     case "mi" :
  //       result = "km"
  //       break;
  //     case "km" :
  //       result = "mi"
  //       break;
  //     case "lbs" :
  //       result = "kg"
  //       break;
  //     case "kg" :
  //       result = "lbs"
  //       break;
  //   }

  //   return result;
  // };

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
