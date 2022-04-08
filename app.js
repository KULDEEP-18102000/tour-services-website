const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
// getting-started.js
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost', {useNewUrlParser: true});

var db=mongoose.connection;
db.on('error',console.error.bind(console,'con-error'));
db.once('open',function(){
    console.log('connected bro');
});

const contactSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    PhoneNumber: String,
    Message: String
});
  
const contact= mongoose.model('Kitten', contactSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('index.pug', params);
})

// app.get('/contact', (req, res)=>{
//     const con = "This is the best content on the internet so far so use it wisely"
//     const params = {'title': 'PubG is the best game', "content": con}
//     res.status(200).render('contact.pug', params);
// })


app.post('/#contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send('This item has been saved to the database')
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse')
});});

// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// })

// app.listen(port,()=>{
//     console.log('listeningt');
// })
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});