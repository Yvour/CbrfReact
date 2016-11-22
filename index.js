var Iconv = require('iconv').Iconv;
var fromEnc = 'cp1251';
var toEnc = 'utf-8';
var translator = new Iconv(fromEnc, toEnc);

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({
	type : "application/json"
});
var request = require('request');
var app = express();
app.set('view engine', 'ejs');
app
		.use('/scripts', express.static(__dirname
				+ '/node_modules/bootstrap/dist/'));

app.use('/app', express.static(__dirname + '/app', app));

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
	extended : false
})

app.use(bodyParser.urlencoded({
	extended : true
}));

app.get('/', function(req, res) {

	res.render('pages/index', {
		orders : []
	});
});

app.post('/get_courses', jsonParser, function(req, res) {
	var a = req.body;
	console.log("body is " + a);

	if (a.date) {

		request({uri:"http://www.cbr.ru/scripts/XML_daily.asp?date_req=" + a.date.dd
				+ '/' + a.date.mm + '/' + a.date.yyyy ,
encoding:null}

		, function(error, response, body) {
			if (error != null) {
				res.sendStatus(400);
			} else {
				res.set('Content-Type', 'text/xml');
				res.send(translator.convert(body).toString());

			}

		})
	}

});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});

app.locals.renderScriptsTags = function() {

	return '' + [
	// any script
	].reduce(function(prev, item) {
		return prev + '<script src="' + item + '" defer></script>\n';
	}, '')
}
