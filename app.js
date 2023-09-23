const express=require('express')
const app = express() ; 

app.listen(3000); // returns an instance of server 

app.get('/', function(req, res) {

    //res.send('<p>Hello express </p>', 200); // sets automatically the type of response (html , text ..) 
    res.sendFile('./views/index.html', {root:__dirname}) // it looks for absolute path not relative 
});
app.get('/about', function(req, res) {

    res.sendFile('./views/about.html', {root:__dirname}) 
    
});
//redirection
app.get('about-us',(req, res)=> {  
    res.redirect('/about'); 
})

//404 pages 
app.use((req, res)=>{ //it fires for every request !! so it must be in the bottom !!! 
    res.status(404).sendFile('./views/404.html', {root:__dirname})
})