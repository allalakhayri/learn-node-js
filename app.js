const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); // imported from the models folder

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI='mongodb+srv://khayri:test1234@node-learning.uzfiqts.mongodb.net/node-learning?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
  const blog = new Blog({ // new instance of the model 
    title: 'new blog Khayri',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })
// save it to database ( it is as asynchronous task so we use then and catch )
  blog.save()
    .then(result => {
      res.send(result); // send the response from the db to the borwser
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  // Find is used to get all the docs inside the databse ( it is asynchronous)
  Blog.find() // it is used on the model directly !! 
    .then(result => {
      res.send(result); // send result (a list ) from the db to browser
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('65106024f52014b7de106d38') // use the ID to find a blog 
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});