import React, { useEffect, useState } from 'react'
import Headers from './partials/Headers.jsx';
import Todos from './partials/Todos.jsx';
import Addtodomodal from './partials/Addtodomodal.jsx';
import { useNavigate } from 'react-router-dom';
import { getTodolist, getToken } from '../services/api.js';

const Home = () => {

    const navigation = useNavigate()

    const [ list , setList ] = useState([]) 
    const [refreshList , setRefreshList] = useState()

    useEffect(() =>{
     if(!getToken()){
         navigation('/login')
     }
        
        fetchTodoList()
    },[refreshList])

    async function fetchTodoList(){
        const result = await getTodolist()
          console.log('todolist',result)
         if(result.status===200 && result.data.status===200){
            console.log(result.data.data.todos)
            setList(result.data.data.todos.reverse()) 
             
            console.log(result) 
         }
    }

  return (
    <div>
      <Headers />
       <div className="container">
        <div className= 'd-flex justify-content-md-center flex-wrap mt-4'>
            
            {
                list.map((todo) => <Todos todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
            }      
        </div>
       </div>
        <div  style={{position:"fixed",right: 50,bottom: 50, zIndex: 1030}}>
          <button type='button' 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          className="btn btn-primary" >ADD</button>   
        </div>

        <Addtodomodal setRefreshList={setRefreshList}/>

    </div>
  )
}

export default Home;
