const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session')

require('./db/db');


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const corsOptions = {
  origin: 'http://localhost:3000', // when you deploy your react app, this is where you put the address,
  credentials: true, // allowing cookies to be sent with requests from the client (session cookie),
  optionsSuccessStatus: 200 // some legacy browsers IE11 choke on a 204, and options requests
}

app.use(cors(corsOptions));


app.get('/', (req, res, next) => {
  res.json({
    message: "You hit the GET / route"
  })
})

app.post('/demo-postman', (req, res, next) => {
  // pretend we did some stuff -- db query, ajax, etc
  res.status(201).json({
    status: 201,
    message: "request received",
    dataRecieved: req.body
  })
})



// Require the controller after the middleware
const employeeController = require('./controllers/employeeController');
const authController  = require('./controllers/authController');

app.use('/api/v1/employees', employeeController);
app.use('/auth', authController);


app.get('*', (req, res, next) => {
  res.status(404).json({
    status: 404, 
    message: "Not found"
  })
})



app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});
