 function getDateFix(){
  //TODO: BIG BUG. Python is cranky when passing date in ISOString ending with z. time being truncating it.
  var now = new Date();
  return now.toISOString().split('Z')[0];
}

export default {};