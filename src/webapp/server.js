// import packages, set variables
var express       = require('express');
var app           = express();
var morgan        = require('morgan');
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var router        = express.Router();
var appRoutes     = require('./app/routes/routes')(router);
var authRoutes    = require('./app/routes/auth')(router);
var cookieParser  = require("cookie-parser");
                    require('dotenv').config();

// instantiate middlewares
app.use(morgan('dev')); // logger for http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public')); // sets the access to the front end content placed in the public folder
app.use('/api/auth', authRoutes);

// function handling requests that are not handled by the server: sends index.html to front end
app.use(function(req, res){
  res.status(200).sendFile(process.cwd()+'/public/index.html');
});

// connect to database
mongoose.connect('mongodb://localhost:27017/otm-db', function(err){
  if(!err) console.log('Successfuly connected to MongoDB database');
});

// Start server
app.listen(process.env.PORT, function() {
  console.log('Server started on port '+process.env.PORT);
});
