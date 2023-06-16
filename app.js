require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('node:path');
const app = express();
const connection = require('./config/connection');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookieParser');


app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET_KEY,
  saveUninitialized:true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: true,
}));

app.use(passport.initialize());
app.use(passport.session());


const routes = require('./routes/index-routes');
app.use('/', routes)

const port = 4000; 
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

