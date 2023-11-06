import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { createTodoApi } from '../../services/api.js'

const Addtodomodal = ({setRefreshList}) => {

    const [tododesc, setTododesc] = useState("") 

    const handleTodoSubmit = async() =>{
        console.log(tododesc, 'tododesc')
        if(tododesc===''){
            alert("todo is required")
            return;
        }

        const result = await createTodoApi({desc:tododesc})

        if(result.status==200 && result.data.status === 200){
            alert("todo added");
            setRefreshList(new Date())
            setTododesc('')
        }else{
            alert(result.data.message)
        }
    }

  return (
    <div className="modal mt-5" id='exampleModal'>
          <ToastContainer />
            <div className="modal-dialog" role='documnet'>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">
                            Add New Todo 
                        </div>
                        <button type='button' className='btn-close'
                         data-bs-dismiss="modal"
                         aria-label="close">
                            <span arial-hidden="true"></span>
                         </button>
                    </div>
                     <div className="modal-body">
                        <div className="form-group">
                          <textarea name="" 
                           className='form-contrl'
                           rows={3}
                           placeholder='Write Todos...'
                           onChange={(e) => setTododesc(e.target.value)}
                          >   </textarea>  
                        </div>
                     </div>
                     <div className="modal-footer">
                        <button className='btn btn-secondary' data-bs-dismiss="modal" onClick={handleTodoSubmit}>Save Todo</button>
                        <button className='btn btn-secondary' data-bs-dismiss="modal" onClick={() => setTododesc('')}>close</button>
                     </div>
                </div>
            </div>
        </div>
  )
}

export default Addtodomodal;
