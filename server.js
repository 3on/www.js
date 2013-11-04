var express = require("express");

var app = express();
var cwd = process.cwd();

//app.use(express.logger());
app.use(express.directory(cwd));
app.use(express.static(cwd));

app.listen(8042);
