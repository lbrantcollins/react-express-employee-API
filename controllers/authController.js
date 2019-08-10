const express = require('express');
const router  = express.Router();
const User    = require('../models/user');
const bcrypt  = require('bcrypt');


router.post('/login', async (req, res) => {

  // First query the database to see if the user exists
  try {

    const foundUser = await User.findOne({username: req.body.username});
    console.log(foundUser, ' foundUser');

     // If the user exists we'll use bcrypt to see if their password
    // is valid
    if(foundUser) {

      // bcrypt compare returns true // or false
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
         // if valid, we'll set the session
        req.session.userId = foundUser._id;
        req.session.username = foundUser.username;
        req.session.logged = true;

        res.status(200).json({
          success: true,   
          code: 200,
          message: `User ${foundUser.username} logged in`
        })

      } else {
        // send message back to client that
        // the username or password is incorrect
        console.log("bad password")
        res.status(200).json({
          success: false,     
          code: 200,
          message: 'Username or password incorrect'
        })
      }

    } else {
      // user not found
      console.log("username not found")
      // send message back to client that
      // thier username or password is incorrect
      res.status(200).json({
        success: false,     
        code: 200,
        message: 'Username or password incorrect'
      })

    }
  } catch(err){
    res.status(500).json({
      success: false,
      code: 500,
      message: "Internal server error",
      error: err
    })
  }

});


router.post('/register', async (req, res) => {


  // We create our use
  try {

    const userExists = await User.findOne({username: req.body.username})
    if(userExists) {
      res.status(200).json({
        success: false,
        code: 200,
        message: "Username already taken"
      })
    }
    // username not taken -- ok to proceed
    else {

      // encrypt our password
      const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

      const createdUser = await User.create({
        username: req.body.username,
        password: hashedPassword
      });

      // set info on the session
      req.session.userId = createdUser._id;
      req.session.username = createdUser.username;
      req.session.logged = true;

      res.status(200).json({
        success: true,
        code: 200,
        message: `User ${createdUser.username} successfully registered`
      })

    } // else (username nnot taken)

  } catch (err){
    res.status(500).json({
      success: false,
      code: 500,
      message: "Internal server error",
      error: err
    })

  }

});


router.get('/logout', (req, res) => {

  req.session.destroy((err) => {
    if(err){
      res.status(500).json({
        success: false,
        code: 500,
        message: "Internal server error",
        error: err
      })
    } else {
      res.status(200).json({
        success: true,
        code: 200,
        message: "User logged out"
          
      })
    }
  })

})



module.exports = router;
