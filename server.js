var express = require("express"),
	argv = require("minimist")(process.argv.slice(2)),
	open = require("open");

var app = express(),
	CWD = process.cwd(),
	PATH = CWD,
	DEFAULT_PORT = 8042,
	PORT = DEFAULT_PORT;

if (argv.h || argv.help) {
	console.log("www.js 0.4.2 - by Jr@ailleurs.me");
	console.log("");
	console.log("usage: www.js [-p port] [-loh] [path]");
	console.log("-p, --port PORT\t<path>\tPort on wich to listen to");
	console.log("-L, --no-logging\t<path>\tTurn off logging (on )");
	console.log("-o, --open\t<path>\tTo open a browser to the correct address");
	console.log("-h, --help\t<path>\tThis help");
	process.exit();
}

if (!argv.L && !argv["no-logging"]) {
	app.use(express.logger('dev'));
}

if (argv.p || argv.port) {
	PORT = argv.port || argv.p;
	PORT = (Number.isFinite(PORT))? PORT : DEFAULT_PORT;
}

if (argv._.length > 0) {
	PATH = argv._[0];
}

app.use(express.directory(PATH));
app.use(express.static(PATH));

console.log("Start server on port: " + PORT);
console.log("Serving path: " + PATH);
app.listen(PORT);

if(argv.o || argv.open) {
	open("http://localhost:" + PORT);
}
