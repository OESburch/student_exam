
var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    mongoose        = require('mongoose'),
    route           = require('./route'),

    bodyParser      = require('body-parser');

var app = express();
var router = express.Router();
const mongo_port = 3002;


/////////////////////////////////////////////
mongoose.connect('mongodb://localhost:27017/examlist',{
});

mongoose.connection.on('connected', ()=>{
    console.log('mongodb connected');
});

mongoose.connection.on('error', (err)=>{
    console.log(err);
});
//////////////////////////////////////////////




dotenv.load();

// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use('/', route); 

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(express.logger('dev'));
  app.use(errorhandler())
}

app.use(require('./protected-routes'));
app.use(require('./user-routes'));

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});


////////////////////////////////////
app.listen(mongo_port, ()=>{
  console.log('Server has been started on port: '+ mongo_port);
});


