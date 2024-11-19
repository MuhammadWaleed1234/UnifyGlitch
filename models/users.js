const mongoose = require('mongoose');

const UsersSchema= mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required : true},
    name: { type: String, required : true},
    email: { type: String, required : true, unique : true ,match:/^[^@]+@[^@.]+\.[^@]+$/},  // personal regex 
    password: { type: String, required : true },  //,match: /^(?=.*[a-z]+)(?=.*[0-9]+)(?=.*[A-Z])(?=.*[!$^&*-])([a-z0-9A-Z!$^&*-]+){8,}$/ // personal regex 
});

module.exports = mongoose.model('users',UsersSchema);