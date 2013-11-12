rocker-controller
======
Basic rocker/swivel controller that outputs x/y movement delta

example
------

```
var Controller = require("rocker-controller");
var pad = new Controller;
pad.appendTo(document.body);
pad.on("data", function(d) {
  object.x += d[0];
  object.y += d[1];
});
```
