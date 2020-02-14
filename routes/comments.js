const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.get("/", (req,res)=>{
  Comment.find((err, response) => {
    if (!err) {
      res.json(response)
    }
    
  });

})

router.post("/insert", (req,res)=>{
  console.log("New comment inserted!");
  
  const comment = new Comment({
    pseudo: req.body.pseudo,
    description: req.body.description
  });

  comment.save()
  .then(data => {
    res.status(201);
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    
  });
})

module.exports = router;