const express = require('express');
// Next we set up the Router
const router = express.Router();

// require Our Model - Remember Model is
// a representation of our data
// The model should capitalized
const Employee = require('../models/employee');

// Creating the index route
// index route should show all the fruits
router.get('/', async (req, res, next) => {
  // req.body this is from the fetch request
  console.log(req.body, ' this is get all')
     try  {
      const allEmployees = await Employee.find();
      console.log(req.session, ' this is req.session')
      // This is the response to react
      res.status(200).json({
        success: true,
        code: 200,
        message: `Found ${allEmployees.length} employees`,
        data: allEmployees
      });

    } catch (err){
      res.status(500).json({
        success: false,
        code: 500,
        message: "Internal server error",
        error: err
      })
    }
});


router.post('/', async (req, res) => {

  try {
    console.log(req.body, ' this is req.body');
    console.log(req.session, ' req.session in post route')
    const createdEmployee = await Employee.create(req.body);
    console.log('Just createdEmployee !!!!!!!!!!!!!!!!!!! ', createdEmployee);
    res.status(201).json({
      success: true,
      code: 201,
      message: "Successfully created employee",
      data: createdEmployee
    });

  } catch(err){
    res.status(500).json({
      success: false,
      code: 500,
      message: "Internal server error",
      error: err
    })
  }
});

router.get('/:id', async (req, res, next) => {

     try  {
        const foundEmployee = await Employee.findById(req.params.id);
        res.status(200).json({
          success: true,
          code: 200,
          message: "Success",
          data: foundEmployee
        });

      } catch (err){
        res.status(500).json({
          success: false,
          code: 500,
          message: "Internal server error",
          error: err
        })
      }

});

router.put('/:id', async (req, res) => {

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
      success: true,
      code: 200,
      message: "Resource updated successfully",
      data: updatedEmployee
    });
  } catch(err){
    res.status(500).json({
      success: false,
      code: 500,
      message: "Internal server error",
      error: err
    })
  }
});


// Delete route
router.delete('/:id', async (req, res) => {

  try {
     const deletedEmployee = await Employee.findByIdAndRemove(req.params.id);
      res.status(200).json({
        success: true,
        code: 200,
        message: `Successfully deleted employee ${deletedEmployee.name}`
      });
  } catch(err){
    res.status(500).json({
      success: false,
      code: 500,
      message: "Internal server error",
      error: err
    })

  }
});



module.exports = router;
