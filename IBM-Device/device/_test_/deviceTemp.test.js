const tempCurve = require('./deviceTemp');
//°
test('Temperature: Check if value is at 10°C at initial(0) hour', () => {
  expect(tempCurve(0)).toBe(10);
});

test('Temperature: Check if peak temperature equals 26°C', () => {
  expect(tempCurve(11)).toBe(26);
});

test('Temperature: Check if value increasing during first 11 hours', () => {
  for(var i=0; i<12; i++){
    expect(tempCurve(i)).toBeLessThanOrEqual(tempCurve(i+1));
  }
});

test('Temperature: Check if value decreasing after first 11 hours', () => {
  for(var i=11; i<25; i++){
    expect(tempCurve(i)).toBeGreaterThanOrEqual(tempCurve(i+1));
  }
});

test('Temperature: Check if value still in boundary for higher hours', () => {
  var max = 40;
  var min = 0;
  for(var i=24; i<500; i++){
    expect(tempCurve(i)).toBeLessThan(max);
    expect(tempCurve(i)).toBeGreaterThan(min);
  }
});

test('Temperature: Check if value still in boundary for negative hours', () => {
  var max = 40;
  var min = 0;
  for(var i=1; i<-100; i--){
    expect(tempCurve(i)).toBeLessThan(max);
    expect(tempCurve(i)).toBeGreaterThan(min);
  }
})

test('Temperature: Check if null is returned when hour is undefined', () => {
  expect(tempCurve(null)).toBeNull();
})
