function tempCurve(x){
  if(x === null){
    return null;
  }
  else if(x>=0 && x<=24){
    return Math.round(16 * Math.sin(x / 7.16) + 10);
  }
  else{
    return Math.round(8*Math.sin(x/5.16)+13);
  }
}
module.exports = tempCurve;
