const express = require('express');
const hbs = require('hbs') 
const fs = require('fs') 
var app = express();
hbs.registerPartials(__dirname + '/views/patials');
app.set('viewengine','hbs')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
 var now = new Date().toString();
 var log = `${now}: ${req.method} ${req.url}`;
 console.log(log);
 fs.appendFile('server.log', log +'\n',(err) =>{
  if(err){
      console.log('Unable')
  }
 });
 next();
});
app.get('/',(req, res) => {
    res.send({
        name: 'Andrew',
        likes: [
            'Biking',
            'Cities'
        ]
    });
});
app.get('/about',(req, res) => {

    res.render('about.hbs',{
        pageTitle: 'About Page',
        CurrentYear: new Date().getFullYear(),
        Username: req.query.username,
        Password: req.query.surname
    });
});
app.get('/',(req, res) => {
    res.send({
        errMsg: 'Unable to handle request'
    });
});
app.listen(8080);
