const {Router} = require('express');
const List = require('../models/List');
const router = Router();

// main page route
router.get('/', async (req, res)=>{
    // get all data from base
    const list = await List.find({}).lean();
    // render main page
    res.render('index', {
        // dynamic title
        title: 'Coffee main page',
        // status for active link
        isMainPage: true,
        // array with comments data
        list,
        // array with src for slider
        arrSliderHref: ['/slide_1.jpg','/slide_2.jpg','/slide_3.jpg','/slide_4.jpg']
    })
});

// add comment page route
router.get('/write', (req, res)=>{
    // render 'leave a comment' page
    res.render('write', {
        // dynamic title
        title: 'Coffee comments page',
        // status for active link
        isWritePage: true
    })
});

// add comment to database action
router.post('/write', async (req, res) => {
    /*
        Place for validation input data
        ( will be add later)
    */
    // create new document
   const newComment = new List ({
       userName: req.body.userName,
       comment: req.body.comment
   });
    // upload to database
   await newComment.save();
    // return user on main page
   res.redirect('/')

});
// add like logic
router.post('/like', async (req, res) => {
    // find comment in database from _id
    const changed = await List.findById(req.body.id);
    // change estimated status ( on first time like or dislike)
    changed.estimated = true;
    // choose needed status like/unlike
    req.body.status==='unlike'
        ? changed.liked = false
        : changed.liked = true;
    // update data in base
    await changed.save();
    // return user to the main page
    res.redirect('/')
});

module.exports = router;