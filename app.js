const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const bodyparser = require("body-parser");
const port = 8000;

// Define mongoose schema 
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECFIFC STUFF
app.use('/static', express.static('static')); // For serving static file 
app.use(express.urlencoded())

//  PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // set the views directory

// ENDPOINTS
app.get('/',(req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params)
});
app.get('/contact',(req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item ha sbeen saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    });

    // res.status(200).render('contact.pug')
});

// START THE SERVER 
app.listen(port, ()=>{
    console.log(`this application started successfully on port ${port}`);
});