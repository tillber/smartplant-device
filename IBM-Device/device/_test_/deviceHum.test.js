/**
Following tests are done on functions which simulate temperature, humidity and pH-value.
the functions are described as mathematical functions dependent on one variable, x.
The variable represents the number of passed hours during a 24-hour day.
**/

const humCurve = require('./deviceHum');
const tempCurve = require('./deviceTemp');

/**
  Humidity.
**/

test('Humidity: Check if value is at 40% at initial(0) hour', () => {
  expect(humCurve(0)).toBe(40);
});

test('Humidity: Check if value is at 86% at after 8 hours', () => {
  expect(humCurve(8)).toBe(86);
});

test('Humidity: Check if value decrease after first point of watering', () => {
  for(var i = 8; i<24; i++){
    expect(humCurve(i)).toBeGreaterThan(humCurve(i+1));
  }
});

test('Humidity: Check if value increase after second point of watering', () => {
  expect(humCurve(24)).toBeLessThan(humCurve(0));
});

test('Humidity: Check if value for hours between 25 and 500 remains in boundary', () => {
  const max = 99;
  const min = 0;
  for(var i = 25; i<500; i++){
    expect(humCurve(i)).toBeLessThan(max);
    expect(humCurve(i)).toBeGreaterThan(min);
  }
});

test('Humidity: Check if value is decreasing when temperature rises until watering', () => {
  for(var i = 1; i<8; i++){
    expect(humCurve(i)).toBeLessThan(humCurve(i-1));
    expect(tempCurve(i)).toBeGreaterThan(tempCurve(i-1));
  }
});

test('Humidity: Check if returning NULL for undefined hour', () => {
  expect(humCurve(null)).toBeNull();
})

test('Humidity: Check if value is within boundary for negative hours', () => {
  var max = 99;
  var min = 0;
  for(var i = 0; i>-100; i--){
    expect(humCurve(i)).toBeGreaterThanOrEqual(min);
    expect(humCurve(i)).toBeLessThanOrEqual(max);
  }
})
