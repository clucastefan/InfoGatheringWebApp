const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const scanSchema = new Schema({
    titlu: {type: String, required: true},
    descriere: {type: String, required: true},
    addr: {type: String, required: true},
    tipScan: {type: String, required: true},
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Scan', scanSchema);