function templateStr(tplString, attributes) {
  var i;
  for (i in attributes) {
    if (attributes.hasOwnProperty(i)) {
      tplString = tplString.replace("{{" + i + "}}", attributes[i]);
    }
  }
  return tplString;
}
