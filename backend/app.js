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
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS")

})

app.post("/api/posts",(req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();

  res.status(201).json({
    message: 'Post addded succesfully'
  })

});



app.get('/api/posts',(req,res,next) => {
  const posts = [
    {
    id: 'fad12421l',
    title:'First  server-side post',
    content: 'this is coming from the server'
    },{
      id: 'aerfgs324',
      title:'Second  server-side post',
      content: 'this is coming from the server'
      },
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });

});




module.exports = app;
