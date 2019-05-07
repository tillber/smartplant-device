function humCurve(x) {
  if(x===null){
    return null;
  }
  else if(x >= 0 && x <= 7){
    return Math.round(40 - 2*x);
  }
  else if(x > 7 && x <= 8){
    return Math.round(60*x - 394);
  }
  else if(x>8 && x<=24){
    return Math.round(-0.124*x*x+93.9355);
  }
  else{
    return Math.round(45 - 16*Math.sin(x / 3.2));
  }
}

module.exports = humCurve;
