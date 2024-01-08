var Admin         = require('../models/admin');
var path          = require('path');
const bcrypt      = require('bcryptjs');
const jwt         = require('jsonwebtoken');
const verifyAuth  = require('../middleware/checkAuth')

module.exports = function(router){

  router.get('/isauth', verifyAuth, function(req, res) {
    res.end();
  });

  router.post('/login', function(req, res, next){
    // authentificate the user
    let fetchedAdmin;

    Admin.findOne({email: req.body.email}).then(function(admin){
      if(!admin) return res.status(401).json({message: "No such Admin user"});

      fetchedAdmin = admin;
      bcrypt.compare(req.body.password, admin.password, function(error, result){
        if(!result) return res.status(401).json({message: "Incorrect password"});

        // create JSON WEB TOKEN
        const token = jwt.sign(
          {email: fetchedAdmin.email, id: fetchedAdmin._id},
          process.env.JSON_WEB_TOKEN_KEY,
          {expiresIn: "1h"}
        );

        res.status(200).cookie('secureCookie', token,{
          secure: true,
          httpOnly: true
        });

        res.json({
          message: "Welcome back ",
          username: fetchedAdmin.username
        });
      });
    })
    .catch(function(error){
      console.log(error);
    });
  });

  router.post('/register', function(req, res, next){
    bcrypt.hash(req.body.password, 10).then(function(hash){
      const admin = new Admin({
        username: req.body.username,
        email: req.body.email,
        password: hash
      });

      Admin.findOne({email: req.body.email}).then(function(admindb) {
        if(admindb) return res.status(400).json({message: "Email Address already used"});
      });

      admin.save().then(function(result) {
        if(!result) return res.status(500).json({message: "Error Creating USer"});

        res.status(201).json({
          message: "User has been created",
          result: result
        });
      });
    });
  });

  return router;
}
