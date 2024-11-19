const mongoose = require('mongoose');

const tstSchema= mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required : true},
    data: { type: String, required:true},
});

module.exports = mongoose.model('tst',tstSchema);