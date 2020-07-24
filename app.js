const   express  = require("express");
        app      = express();
        path     = require('path');
        mongoose = require('mongoose');
        bcrypt   = require('bcryptjs')
        port     =  3000;
const   User     = require("./models/models");       
const { error }  = require("console");

        
app.use(express.static('e:/web-projects'))
app.use(express.json()) ;



app.get('/' ,(req,res) =>{
        res.sendFile(path.join(__dirname + '/index.html'));
}); 




app.post('/users/register',(req,res) => {
        let user = new User(req.body)
        let hashPass = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashPass;
        user.save((err) => {
                (err) ? res.status(500).send() : res.status(201).send();
      })
})





app.listen(port)