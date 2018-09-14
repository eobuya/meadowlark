// include http package
var http = require("http"); // include http package

// start http server
http.createServer(function(req, res){

// this callback function is called every time a user tries to access our site
//  res.writeHead(200, { "Content-Type": "text/plain" });

var path  = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
switch(path) {
  case "":
	res.writeHead(200, { "Content-Type": "text/html" });
	var html = "<html>";
	html +="<body>";
	html +="<a href='";
	if (Math.random() > 0.5) {
		html += "/blue";
	}
	else {
		html += "/green";
	}
	html += "'>Click Me</a";
	html +="</body>";
	html +="</html>";
	res.end(html);
	break;

  case "/blue":
	res.writeHead(200, { "Content-Type": "text/html" });
	res.end("<html><body bgcolor='blue'</body></html>");
	break;
  case "/green":
	res.writeHead(200, { "Content-Type": "text/html" });
	res.end("<html><body bgcolor='green'</body></html>");
	break;
  default:
	res.writeHead(404, { "Content-Type": "text/html" });
	res.end("Not Found");
	break;
}
}).listen(3000);

console.log("Server started on localhost: 3000; press Ctrl-C to terminate...");
