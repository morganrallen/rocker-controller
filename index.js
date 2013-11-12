var EventEmitter = require("events").EventEmitter;
var util = require("util");

function Controller() {
  this.el = document.createElement("div");
  this.el.className = "controller";
  this.knob = document.createElement("div");
  this.knob.className = "knob";
  this.el.appendChild(this.knob);

  this.knob.addEventListener("mousemove", this.onMouseMove.bind(this), false);
  this.knob.addEventListener("mouseout", this.onMouseOut.bind(this), false);
  this.knob.addEventListener("mousedown", this.onMouseDown.bind(this), false);
  this.knob.addEventListener("mouseup", this.onMouseUp.bind(this), false);

  this._limit = 30;
}

util.inherits(Controller, EventEmitter);

Controller.prototype.appendTo = function(el) {
  el.appendChild(this.el);

  var style = getComputedStyle(this.knob);
  this._home = [
    parseInt(style.left, 10),
    parseInt(style.top, 10)
  ];

  return this.el;
};

Controller.prototype.onMouseDown = function(evt) {
  var style = getComputedStyle(this.knob);
  var left = parseInt(style.left, 10);
  var top = parseInt(style.top, 10);
  this._elStart = [ left, top ];
  this._mouseStart = [ evt.x, evt.y ];
  this._mouseDown = true;
};

Controller.prototype.onMouseUp = function(evt) {
  this._mouseDown = false;
  this.goHome();
};

Controller.prototype.onMouseMove = function(evt) {
  if(this._mouseDown) {
    var left = this._elStart[0] + (evt.x - this._mouseStart[0]);
    var top = this._elStart[1] + (evt.y - this._mouseStart[1]);

    var leftDelta = left - this._elStart[0];
    var topDelta = top - this._elStart[1];

    if(Math.abs(leftDelta) < this._limit)
      this.knob.style.left = left + "px";
    if(Math.abs(topDelta) < this._limit)
      this.knob.style.top = top + "px";

    this.emit("data", [ leftDelta, topDelta ]);
  }
};

Controller.prototype.onMouseOut = function(evt) {
};

Controller.prototype.goHome = function() {
  this.knob.style.left = this._home[0] + "px";
  this.knob.style.top = this._home[1] + "px";
  this.emit("data", [ 0, 0 ]);
}

module.exports = Controller;
