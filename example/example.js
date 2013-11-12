var Rocker = require("../");

var frame = document.querySelector(".frame");

var jibber = document.createElement("div");
jibber.style.height = "3px";
jibber.style.width = "3px";
jibber.style['background-color'] = "black";
jibber.style.position = "relative";
jibber.style.top = "16px";
jibber.style.left = "16px";

frame.appendChild(jibber);

var control = new Rocker;

control.appendTo(frame);
control.on("data", function(d) {
  var x = parseInt(jibber.style.left);
  var y = parseInt(jibber.style.top);
  x += d[0];
  y += d[1];
  if(x < 1) x = 1;
  if(x > 500) x = 500;

  if(y < 1) y = 1;
  if(y > 300) y = 300;

  jibber.style.left = (x) + "px";
  jibber.style.top = (y) + "px";
});
