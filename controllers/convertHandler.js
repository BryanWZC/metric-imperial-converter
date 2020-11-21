const METRIC_UNITS = { l: 'liters',  kg: 'kilograms', km: 'kilometers' };
const IMPERIAL_UNITS = { gal: 'gallons', lbs: 'pounds', mi: 'miles' };

function ConvertHandler() {
  
  this.getNum = function(input) {
    if(!input) return;
    const splitNum = input.split('/');
    if(splitNum.length === 1 && !parseFloat(splitNum[0])) return 1;
    if(splitNum.length > 2) return;

    let result = 0;
    splitNum.map(num => {
        const newNum = parseFloat(num);
        return !result ? result = newNum : result /= newNum;
    });
    return result;
  };
  
  this.getUnit = function(input) {
    if(!input) return;
    result = input.match(/[a-z]+/gi)[0].toLowerCase();
    if(!METRIC_UNITS[result] && !IMPERIAL_UNITS[result]) return;
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const metric = Object.keys(METRIC_UNITS);
    const imperial = Object.keys(IMPERIAL_UNITS);

    const metricUnit = metric[imperial.indexOf(initUnit)];
    const imperialUnit = imperial[metric.indexOf(initUnit)];

    return metricUnit || imperialUnit;
  };

  this.spellOutUnit = function(unit) {
    return METRIC_UNITS[unit] || IMPERIAL_UNITS[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const newNum = (this.testImperial(initUnit)) ? 
        initNum * this.getConvertFactor(initUnit) :
        initNum / this.getConvertFactor(this.getReturnUnit(initUnit));
    return Number(newNum.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

  this.testImperial = function(unit) {
      return !!IMPERIAL_UNITS[unit];
  }

  this.getConvertFactor = function(unit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const imperialConvert= { gal: galToL, lbs: lbsToKg, mi: miToKm };
    return imperialConvert[unit];
  }
  
}

module.exports = ConvertHandler;
