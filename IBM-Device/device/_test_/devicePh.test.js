const phCurve = require('./devicePh');

test('pH: Check if value equals 6.4 on initial hour', () => {
  expect(phCurve(0)).toBe(6.4);
});

test('pH: Check if lowest value is 5.6', () => {
  expect(phCurve(24)).toBe(5.6);
});

test('pH: Check if highest value is 7.8', () => {
  expect(phCurve(10)).toBe(7.8);
});

test('pH: Check if returning NULL when hour undefined', () => {
  expect(phCurve(null)).toBeNull();
});

test('pH: Check if value is within boundary for negative hours', () => {
  var max = 14;
  var min = 0;
  for(var i = 0; i>-100; i--){
    expect(phCurve(i)).toBeLessThan(max);
    expect(phCurve(i)).toBeGreaterThan(min);
  }
});

test('pH: Check if value is within boundary for high hours', () => {
  var max = 14;
  var min = 0;
  for(var i = 0; i<500; i++){
    expect(phCurve(i)).toBeLessThan(max);
    expect(phCurve(i)).toBeGreaterThan(min);
  }
});
