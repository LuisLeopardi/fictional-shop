const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema ({
    username:String,
    password:String,
}, 
{ collection: 'admin' }
);

const Admin = mongoose.model('admin', AdminSchema);
module.exports = Admin;