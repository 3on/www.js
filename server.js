var express = require("express"),
	argv = require("minimist")(process.argv.slice(2)),
	open = require("open"),
	logger = require('morgan'),
	serveIndex = require('serve-index'),
	serveStatic = require('serve-static');

var app = express(),
	CWD = process.cwd(),
	PATH = CWD,
	DEFAULT_PORT = 8042,
	PORT = DEFAULT_PORT;

if (argv.h || argv.help) {
	console.log("www.js 0.4.4 - by Jr@ailleurs.me");
	console.log("");
	console.log("usage: www.js [-p port] [-loh] [path]");
	console.log("-p, --port PORT\t<path>\tPort on wich to listen to");
	console.log("-L, --no-logging\t<path>\tTurn off logging (on )");
	console.log("-o, --open\t<path>\tTo open a browser to the correct address");
	console.log("-h, --help\t<path>\tThis help");
	process.exit();
}

if (!argv.L && !argv["no-logging"]) {
	app.use(logger('dev'));
}

if (argv.p || argv.port) {
	PORT = argv.port || argv.p;
	PORT = (Number.isFinite(PORT))? PORT : DEFAULT_PORT;
}

if (argv._.length > 0) {
	PATH = argv._[0];
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(serveIndex(PATH));
app.use(serveStatic(PATH));

console.log("Start server on port: " + PORT);
console.log("Serving path: " + PATH);
app.listen(PORT);

if(argv.o || argv.open) {
	open("http://localhost:" + PORT);
}
