const express = require('express');
const app = express();
const fs = require('fs');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    fs.readdir(`./Files`, function(err, files) {
        if (err) {
            console.error('Error reading directory', err);
            return res.status(500).send('Error reading directory');
        }
        res.render('index', { files: files });
    });
});
app.get('/Files/:filename',function (req, res) {
    fs.readFile(`./Files/${req.params.filename}`,function(err,filedata){
        res.render('show',{filename:req.params.filename, filedata:filedata})
    })
});
app.get('/edit/:filename', function (req, res) {
    
        res.render('edit', { filename: req.params.filename});
    
});

app.post("/create", function (req, res) {
     fs.writeFile(`./Files/${req.body.title.split('').join('')}.txt`,req.body.details, function(err){
        res.redirect('/');
     })         
});
app.post("/edit",function(req,res){
    fs.rename(`./Files/${req.body.previous}`,`./Files/${req.body.new}`,function(err){
        res.redirect("/")
    })
})

app.listen(4000, function () {
    console.log("Server is running on port 4000");
});
