const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

// Define routes
app.use(express.json());
app.use(cors());
let todos=[];
let id=0;

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos',(req,res)=>{
    const {todo}=req.body;
    const newTodo={id:id,todo};
    todos.push(newTodo);
    
    id++;
    res.status(201).send(newTodo);
})

app.delete('/todos/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const index=todos.findIndex(todo=>todo.id===id);
    if(index!==-1){
        const deletedTodo=todos.splice(index,1);
        res.json(deletedTodo[0]);
    }
    else{
     res.status(404).json({error:"Not Found"});
    }
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
