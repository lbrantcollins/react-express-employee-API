const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  birthDate: Date,
  department: String,
  annualSalary: String
});


// Exporting the whole fruits array
// and it will be named whatever we require as
module.exports = mongoose.model('Employee', employeeSchema);
