var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var Todo = mongoose.model('Todo', {text: String,done: Boolean});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/todos', (req,res)=> {
  Todo.find((err, todos) => {
    res.json(todos);
  });
});


//post: insert(SQL), create(MongoDB) 
router.post('/todos',(req, res) =>{
  Todo.create({text: req.body.text, done:false}, (err, result) => {
    if(err){res.send(err); return;}
    Todo.find( (err, todos) => { 
      res.json(todos); 
    });
  });
});
// delete: delete(SQL), remove(Mong.oDB)
router.delete('/todos/:id', (req,res)=>{
  Todo.remove({_id:req.params.id}, (err, result)=>{
    if (err) { res.send(err); return; }
    Todo.find((err, todos) => {
      res.json(todos);
    });
  });
});

module.exports = router;
