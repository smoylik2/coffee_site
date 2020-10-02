/*
* This is a simple application for little site
* Used technologies:
*                   express js, ( controller )
*                   mongodb,    ( data model )
*                   handlebars  ( view user interface )
* */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const routes = require('./routes/route');

// access data
const PORT = process.env.PORT || 3000;
const password = 'fgn889gn';
const dbname = 'Coffee_site';
const uri = `mongodb+srv://smoylik:${password}@cluster0.qyybq.mongodb.net/${dbname}`;

// init express js
const app = express();

// init handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

// init express route
app.use(express.urlencoded({ extended: true}));
app.use(routes);

// init static files from /public
app.use(express.static(path.join( __dirname, 'public')));

async function start() {
    try{
        // connect to database
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        // run server
        app.listen(PORT, ()=>{
            console.log('Server has started...')
        })
    }catch (e) {
        console.log(e)
    }
}
// init main function
start();