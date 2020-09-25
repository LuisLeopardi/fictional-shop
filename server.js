const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// MIDDLEWARES

app.use(session({
    name:'adminSession',
    secret:'keyboardCat',
    resave: true,
    rolling:true,
    saveUninitialized: true,
    cookie:{
        maxAge: 60000 * 60 * 24,
        httpOnly: false,
        sameSite:true,
        secure:false
    }
}))

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());

// ROUTES
const logout = require('./routes/api/logout');
app.use('/logout', logout);
const getNewItems = require('./routes/api/getNewItems');
app.use('/getNewItems', getNewItems);
const getNewItemsAdmin = require('./routes/api/getNewItemsAdmin');
app.use('/getNewItemsAdmin', getNewItemsAdmin);
const admin = require('./routes/api/admin');
app.use('/admin', admin);
const upload = require('./routes/api/upload');
app.use('/upload', upload);
const newAdmin = require('./routes/api/newAdmin');
app.use('/newAdmin', newAdmin);
const getItem = require('./routes/api/getItem');
app.use('/getItem', getItem);
const search = require('./routes/api/search');
app.use('/search', search);
const modify = require('./routes/api/modify');
app.use('/modify', modify);
const deleteItem = require('./routes/api/delete');
app.use('/delete', deleteItem);
const getAllItemsInCollection = require('./routes/api/getAllItemsInCollection');
app.use('/getAllItemsInCollection', getAllItemsInCollection);
const auth = require('./auth');
app.use('/getAuth', auth);

// CONNECT

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

mongoose
.connect(
    process.env.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false  
})
.then(()=>console.log('DB conected'))
.catch(err=>console.log(err));

