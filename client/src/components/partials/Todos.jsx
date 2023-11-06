import React from 'react';
import moment from 'moment/moment'
import { deleteTodo, markTodo } from '../../services/api.js';

function Todos({todo , setRefreshList}) {

 const handleDelete = async() =>{
    const result = await deleteTodo({
        todo_id: todo._id
    })

    if(result.data.status===200){
        setRefreshList(new Date())
        alert("deleted")
    }else{
        alert("failed to delete, please try again")
    }
 }

 const handleMark = async() =>{
    const result = await markTodo({
        todo_id: todo._id
    })
       console.log("Mark Todo", result)
    if(result.data.status===200){
        setRefreshList(new Date())
        alert(result.data.message)
    }else{
        alert("failed to mark, please try again")
    }
 } 

  return (
    <div className=''>
      <div className="col-sm-9 mx-5 my-4 alert bg-">
           <p className="card-header">
              {todo.isCompleted ? 'completed': "not completed"}
           </p>
           <div className="card-body">
             <h3 className='card-title'>{todo.desc}</h3>
             <p className='card-text'>{moment(todo.date).fromNow()}</p>

             <div className="actionButtons">
                <div className="deleteButton">
                    <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
                <br />
                <div className="markTodo">
                    <button onClick={handleMark} type="button" class="btn btn-info">{todo.isCompleted? 'Mark Uncomplete': 'Mark Complete'}</button>
                </div>
             </div>
           </div>
      </div>
    </div>
  )
}

export default Todos;
