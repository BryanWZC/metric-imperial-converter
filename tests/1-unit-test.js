const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

describe('Unit Tests', function(){
  
  describe('Function convertHandler.getNum(input)', function() {
    
    it('Should Accept Whole number input', function(done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    it('Should Accept Decimal Input', function(done) {
      const input = '3.5L';
      assert.equal(convertHandler.getNum(input), 3.5);
      done();
    });
    
    it('Should Accept Fractional Input', function(done) {
      const input = '1/2gal';
      assert.equal(convertHandler.getNum(input), 0.5); 
      done();
    });
    
    it('Should Accept Fractional Input w/ Decimal', function(done) {
      const input = '1/0.5l'
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });
    
    it('Should Not Accept invalid Input (double fraction)', function(done) {
      const input = '5/8/9l'
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });
    
    it('Should Default No Numerical Input to 1', function(done) {
      const input ='km'
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  describe('Function convertHandler.getUnit(input)', function() {
    
    it('Should Accept For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        const result = convertHandler.getUnit(ele);
        should.exist(result);
      });
      done();
    });
    
    it('Should Handle Unknown Unit Input', function(done) {
      const input = '5dbcj';
      assert.equal(convertHandler.getUnit(input), undefined);
      done();
    });  
    
  });
  
  describe('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    it('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  describe('Function convertHandler.spellOutUnit(unit)', function() {
    
    it('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach((e, i) => {
        assert.equal(convertHandler.spellOutUnit(e), expect[i]);
      });
      done();
    });
    
  });
  
  describe('Function convertHandler.convert(num, unit)', function() {
    
    it('Should Convert Gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1); //0.1 tolerance
      done();
    });
    
    it('Should Convert L to Gal', function(done) {
      const input = [5, 'l'];
      const expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
    
    it('Should Convert Mi to Km', function(done) {
      const input = [5, 'mi'];
      const expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
    
    it('Should Convert Km to Mi', function(done) {
      const input = [5, 'km'];
      const expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
    
    it('Should Convert Lbs to Kg', function(done) {
      const input = [5, 'lbs'];
      const expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
    
    it('Should Convert Kg to Lbs', function(done) {
      const input = [5, 'kg'];
      const expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
  });
});