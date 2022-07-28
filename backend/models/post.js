const { ModuleResolver } = require('@angular/compiler-cli/src/ngtsc/imports');
const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true}
})


     module.exports =  mongoose.model('Post',postSchema);
