const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/videos',(req,res,next) => {
    return res.json('Hello World');
})


mongoose.connect(`mongodb+srv://Farhan26:Sherlock1234@farhan01.yzaff.mongodb.net/graphql_node?retryWrites=true&w=majority`,
{ useNewUrlParser: true , useUnifiedTopology: true }

)
.then(() => {
  app.listen(3000,(error) => {
    if(error) console.log(error);
    else console.log(`http://localhost:3000`);
  });
})
.catch(error => {
  console.log(error);
});