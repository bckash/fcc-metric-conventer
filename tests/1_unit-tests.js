const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    suite('getNum()', function(){
        test("read whole number", (done) => {
            let inpt = '55kg'
            assert.equal(convertHandler.getNum(inpt), 55)
            done()
        })
        test("read decimal number", (done) => {
            let inpt = '55.5kg'
            assert.equal(convertHandler.getNum(inpt), 55.5)
            done()
        })
        test("read fractional input", (done) => {
            let inpt = '55/5kg'
            assert.equal(convertHandler.getNum(inpt), 11)
            done()
        })
        test("fractional input with a decimal", (done) => {
            let inpt = '55.5/5kg'
            assert.equal(convertHandler.getNum(inpt), 11.1)
            done()
        })
        test("error on a double-fraction", (done) => {
            let inpt = '3/2/35kg'
            assert.equal(convertHandler.getNum(inpt), "invalid number")
            done()
        })
        test("default to a numerical input of 1 when no numerical input is provided", (done) => {
            let inpt = 'kg'
            assert.equal(convertHandler.getNum(inpt), 1)
            done()
        })
    })

    suite('getUnit()', function(){
        test("read each valid input unit", (done) => {
            let inpt = '55kg'
            assert.equal(convertHandler.getUnit(inpt), "kg")
            done()
        })
        test("return an error for an invalid input unit", (done) => {
            let inpt = '55kgz'
            assert.equal(convertHandler.getUnit(inpt), "invalid unit")
            done()
        })
    })

    suite('getReturnUnit()', function(){
        test("return the correct return unit for each valid input unit", (done) => {
            let inpt = 'kg'
            assert.equal(convertHandler.getReturnUnit(inpt), "lbs")
            done()
        })
    })

    suite('getString()', function(){
        test("return the spelled-out string unit for each valid input unit", (done) => {
            let initNum = 55
            let returnNum = 121.25434
            let returnUnit = "lbs"
            assert.equal(convertHandler.getString(initNum, returnNum, returnUnit), "55 kilograms converts to 121.25434 pounds")
            done()
        })
    })

    suite('getReturnUnit()', function(){
        test("convert gal to L", (done) => {
            let inpt = 'gal'
            assert.equal(convertHandler.getReturnUnit(inpt), "L")
            done()
        })
        test("convert L to gal", (done) => {
            let inpt = 'L'
            assert.equal(convertHandler.getReturnUnit(inpt), "gal")
            done()
        })
        test("convert mi to km", (done) => {
            let inpt = 'mi'
            assert.equal(convertHandler.getReturnUnit(inpt), "km")
            done()
        })
        test("convert km to mi", (done) => {
            let inpt = 'km'
            assert.equal(convertHandler.getReturnUnit(inpt), "mi")
            done()
        })
        test("convert lbs to kg", (done) => {
            let inpt = 'lbs'
            assert.equal(convertHandler.getReturnUnit(inpt), "kg")
            done()
        })
        test(" convert kg to lbs", (done) => {
            let inpt = 'kg'
            assert.equal(convertHandler.getReturnUnit(inpt), "lbs")
            done()
        })
    })
});