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
const MongoStore = require('connect-mongo');
const passport = require('passport');



app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl:process.env.DB_URL})
}));

app.use(passport.initialize());
app.use(passport.session());


const routes = require('./routes/index-routes');
app.use('/', routes)

const port = 4000; 
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

