var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var ejs = require('ejs');
var engine = require('ejs-mate');
var mongoose = require('mongoose');

//determine are we in production environment or not
//proccess.env.NODE_ENV - node environment variable, it doesn't have default value
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('multivision db opened');
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
  mongoMessage = messageDoc.message;
});


app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Engine
app.engine('ejs', engine);
app.set('view engine', 'ejs'); 

app.set('views', __dirname + '/server/views');

app.get('/partials/:partialPath', function(req, res){
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
	res.render('index', {
		mongoMessage: mongoMessage
	});
});

app.listen(3030, function(){
	console.log('App is listening on port 3030');
});