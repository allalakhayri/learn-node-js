const express=require('express')
const router=express.Router(); 
const Blog = require('../models/blog'); // imported from the models folder



router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });
  
  router.get('/'  , (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // get all blogs from db and render them in the browser 
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  router.post('/', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
      .then(result=>{ 
        res.redirect('/blogs') // redirect  the user to the home page
      }) 
      .catch(err=>cons.log(err))
  })
  
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id) // delete from the database using the ID 
      .then(result => {
        res.json({ redirect: '/blogs' }); // send the json to the browser
      })
      .catch(err => {
        console.log(err);
      });
  });
  module.exports = router;