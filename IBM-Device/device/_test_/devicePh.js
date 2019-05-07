function phCurve(x) {
  if(x===null){
    return null;
  }
  else{
    return Math.round((6.4 + 1.4*Math.sin(x / 6.4))*10)/10;
  }
}
module.exports = phCurve;
