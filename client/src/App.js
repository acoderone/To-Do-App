import React ,{useEffect, useState}from 'react';
import Card from '@mui/material/Card';
import './App.css';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
function App() {
 
  const [todo,setTodo]=useState('');
const [addTodo,setAddTodo]=useState([]);
useEffect(()=>{
  axios.get('http://localhost:8000/todos')
  .then(response=>setAddTodo(response.data))
  .catch(error=>console.log(error))
},[])
const HandleAdd=(e)=>{

  setTodo(e.target.value);
  
  }

  const handleAddtodo=()=>{
    
    if(todo.trim()!==''){
      axios.post('http://localhost:8000/todos',{todo:todo})
      .then(response=>{
      setAddTodo([...addTodo,response.data]);
      setTodo('');
      }
      
      )
      .catch(error=>console.error(error));
    }
     
    
  }
  const handleDelete=(index)=>{
   axios.delete(`http://localhost:8000/todos/${index}`)
   .then(()=>{
    setAddTodo(addTodo.filter(todo=>todo.id!==index));
   })
   .catch(error=>console.error(error));
  }
  return (
    <div className='todo'>
    <div className='inputField'>
    <TextField id="standard-basic" label="What do you want to do?" variant="standard"  type="text" value={todo} onChange={HandleAdd}/>
     
      <Button  variant='outlined' size='medium' onClick={handleAddtodo}>Add</Button>
      </div> 
    <div className='container'>
    <ul className='myuL'>
        {addTodo.map(item=>(
          <li key={item.id}>
          <Card className='card' variant="outlined" sx={{ minWidth: 275 }}>
         <CardContent className='card-content'>
         <Typography className='typo' variant="h5" component="div" style={{fontFamily: 'Satisfy, cursive'}}>
         {item.todo}
        </Typography>
          
          <br></br>
          <IconButton  onClick={()=>handleDelete(item.id)} aria-label="delete" size="small">
  <DeleteIcon />
</IconButton>
          
          </CardContent>
   </Card>
          </li>
        ))}
      </ul>
    </div>  
    
      
    </div>

   
     
  );
}

export default App;
