const Routes = require('./api/v1/Routes');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

mongoose.connect("mongodb://localhost:27017/userdb");

app.use('/api/v1', Routes);

app.listen(8080, () => {
    console.log('Started at 8080.');
});

/*
userScheme.pre('save', (next) => {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) =>{
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/*
userScheme.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



/*
app.get('/api/v1/users', function (rec, res) {

    User.find({},function(err,result){
        if(err){
                res.send(err);
        }

        res.send(result);
    });

});


app.get('/api/v1/users/:_id',function(rec,res){

    User.findById(rec.params,function(err,result){
        if(err)
        {
            res.sendStatus(404);
        }
        res.send(result);
    });
});


app.post('/api/v1/users',function(rec,res){
    var userT = new User(rec.body);
    
    userT.save(function(err){
        if(err){
            res.status(400).send(err);
        }
        res.status(201).send(userT);
    });

});


app.delete('/api/v1/users/:_id',function(rec,res){

    User.findByIdAndRemove(rec.params,function(err,result){
        if(err)
        {
            res.sendStatus(404);
           res.send(err);
        }
        res.send('User deleted successfully');
    });

});

app.put('/api/v1/users/:_id',function(rec,res){

    User.findByIdAndUpdate(rec.params._id, rec.body, {new: true, runValidators: true})
        .exec()
        .then(userData => res.status(200).send(userData))
        .catch(err => res.status(404).send(err)) 
        
});*/