var express = require('express');
var app = express();


// set up handlebars view engine
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3001);

//app.get is for specific locations
app.get('/', function(req, res){
	res.render('home');
//	res.type('text/plain');
//	res.send('Meadowlark Travel');
});

app.get('/about', function(req, res){
	var randomFortune =
		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: randomFortune });
});

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];

app.get('/about', function(req, res){
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: randomFortune });
});

//app.get('/about', function(req, res){
//	res.render('about');
//	res.type('text/plain');
//	res.send('About Meadowlark Travel');
});

//date and time handler
app.get('/datetime', function(req, res){
	res.render('datetime');

//	res.render('datetime', { datetime: new Date().toString() });
});

//static pages
app.use(express.static(__dirname + '/public'));

// custom 404 page (html code meaning page not found); catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
//res.type('text/plain');
//res.send('404 - Not Found');
});

// custom 500 page; error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
//res.type('text/plain');
//res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});