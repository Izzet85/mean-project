const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();

mongoose.connect("mongodb+srv://Izzet:ZQKEE6TDAN1JYZan@cluster0.6ihsn.mongodb.net/node_angular?retryWrites=true&w=majority")
.then( () => {
  console.log('Connnected to database');
}).catch(
  (err) => {
    console.log(err);
  }
)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers',
  "Origin, X-Requested-With,Content-Type,Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET,POST,PATCH,PUT,DELETE,OPTIONS");

  next();

});







app.post("/api/posts",(req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {

  res.status(201).json({
    message: 'Post addded succesfully',
    postId: createdPost._id
  })
  } );
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id},post).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update succesfull!'})
  })
})





app.get('/api/posts',(req,res,next) => {
 Post.find()
 .then(documents => {
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: documents
  });
 });



});

app.delete('/api/posts/:id', (req,res, next) => {
  Post.deleteOne({_id: req.params.id}).then( result => {
    console.log(result);
  })
  res.status(200).json({message: "Post deleted!"})
})




module.exports = app;
