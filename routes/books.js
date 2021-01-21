var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');

// get shows a page of Books (SELECT) R
// post sends data to backend (INSERT) C 
// put updates a current record (UPDATE) U 
// delete deletes a current record (DELETE) D

/* GET home page. */
// URL: http://localhost:3000/books/
router.get('/list/:message?', function(req, res, next) {
    const query = "SELECT * FROM books";
    console.log(req.query);
    // console.log("outside" + req.params.message);
    dbconnection.query(query, function(err, rows) {
        // console.log("inside" + req.params.message);
        if(err) {
            res.render('books', { title: 'Books - ERROR', books: '', message: req.params.message });
        } else {
            res.render('books', { title: 'Books', books:rows, message: req.params.message });
        }
    });
});

// http://localhost:3000/books/add
// shows the actual form for the model book in order to
// collect data from the  client and send them to the backend
router.get('/add/', function(req, res, next) {
    res.render('books_new', { title: 'Books - Add New', message:'' });
});

router.get("/update", function(req, res, next){
    let updateID = req.body.id2
    let updateparams = req.params.id
    const updateQuery = `SELECT * FROM books`
    dbconnection.query(updateQuery,updateparams, function(err, rows){
        if(err){
           console.log(err)
       }else{
           console.log(updateparams)
           console.log(updateID)
           res.render("../views/update.ejs", {title: "Books",  books:rows})

       }
   })
})

router.post("/update", function(req, res, next){
    let updateID = req.body.id2
    let updateparams = req.params.id
    const updateQuery = `SELECT * FROM books WHERE ID =?`
    dbconnection.query(updateQuery,updateID, function(err, rows){
        if(err){
           console.log(err)
       }else{
           console.log(updateID)
           res.render("../views/update.ejs", {title: "Books",  books:rows})

       }
    })
})

router.post("/updateUser", function(req,res, next){
    let title = req.body.title
    let author = req.body.author
    let id = req.body.update
    const updateUserQuery = `UPDATE books SET title = ?, author =? WHERE ID=?`
    dbconnection.query(updateUserQuery,[title,author,id], function(err, test){
        console.log(test)
        console.log(req.body.id)
        res.redirect("/books/list")
    })
})

router.post('/add', function(req, res, next) {
    const query = "INSERT INTO `books`(`title`, `author`) VALUES('"+ req.body.title + "', '" + req.body.author + "')";
    // console.log(query);
    dbconnection.query(query, function(err, status) {
        // NOT OK - Error!!!
        if(err) {
            res.render("books_new", { title: 'Books - Add New', message: "Error inserting data to the database!" });
        } 
        // All OK!!!
        else {
            //res.render("books", { title: 'Books', books: '', message: "All ok!!!" });
            // res.render("books", {});
            res.redirect('/books/list/All OK!!!');
        }
        
    });
});

router.post("/delete", function (req, res, next) {
    let id = req.body.id
    const query2 = "DELETE FROM `books` WHERE ID=?";
    dbconnection.query(query2,id, (err, deleteId) => {
        if(err){
            console.log(err)
        }else{
            res.redirect("/books/list")
            console.log(`fucking id ${deleteId} DELETED!!!`)
        }
    });

  });



module.exports = router;
  