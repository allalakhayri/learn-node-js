const mongoose = require('mongoose');
const Schema= mongoose.Schema; // the pattern that the models should match 

const BlogSchema=new Schema({ 
    title: { 
        type: 'string',
        required: true 
    },
    snippet:{ 
        type: 'string',
        required: true 
    },
    body: { 
        type: 'string',
        required: true 
    }
},{timestamps:true}); // it auto assigns values to  prperties every time 

// models 
// 1st arg: name of the model 
// 2nd arg : schema of  the data 
const Blog= mongoose.model('Blog',BlogSchema)

module.exports = Blog; 