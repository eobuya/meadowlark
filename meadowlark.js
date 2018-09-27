var express = require('express');
var fortune = require("./fortune");

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3001);


app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

//app.get is for specific locations
app.get('/', function(req, res){
	res.render('home');
//	res.type('text/plain');
//	res.send('Meadowlark Travel');
});

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];

app.get('/about', function(req, res){
	res.render('about', {
		//fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
});

app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
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
