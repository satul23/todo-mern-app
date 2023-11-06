import React, { useEffect, useState } from 'react';
import { login } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
// import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Headers from './partials/Headers.jsx';

const Login = () => {

    const navigation = useNavigate()

  const [ form , setForm ] = useState({
    username: "",
    password: "",
  }) 

  useEffect(() =>{
    const user = localStorage.getItem('user')
     if(user){
        return navigation('/')
     }
  },[])

  const [errors, setErrors ] = useState(null)

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handlesubmit = async() => {

     const result = await login(form)
     
     console.log("form",result)
     setErrors(null)

     if(result.status==200){
        if(result.data.status===200){
            localStorage.setItem("user",JSON.stringify(result.data.data))
            navigation('/');
            return;
        }

        if(result.data.status===201){
            setErrors(result.data.data)
            return;
        }

        if(result.data.status===202){
            alert(result.data.message)
        }
     }
  };
   
  return (
    <>
    <Headers />
    <div className='container'>
     <div className="row justify-content-center mt-4">
       <div className="col-lg-5 card border-primary mt-4">
       <div className="card-header">
        <h3>Login Here</h3>
       </div>
  <div className="card-body">
    <h4 className="card-title"></h4>
    <div className="form-group">
  <label htmlFor="exampleInputEmail1" className="form-label mt-4">
    Email or Username
  </label>
  <input
    type="email"
    className="form-control"
    id="exampleInputEmail1"
    aria-describedby="emailHelp"
    placeholder="Enter email"
    fdprocessedid="bmyia"
    onChange={handleChange}
    name='username'
  />
  {
    errors?.username && <small id='emailHelp' className='form-text text-danger' >
    {errors.username.msg}
    </small> 
  }
</div>
<div className="form-group">
  <label htmlFor="exampleInputEmail1" className="form-label mt-4">
    Password
  </label>
  <input
    type="email"
    className="form-control"
    id="exampleInputEmail1"
    aria-describedby="emailHelp"
    placeholder="Enter password"
    fdprocessedid="bmyia"
    onChange={handleChange}
    name='password'
  />
  {
    errors?.password && <small id='emailHelp' className='form-text text-danger' >
   {errors.password.msg}
   </small> 
 }
</div>
 <br />

<button type="button" onClick={handlesubmit} className="btn btn-primary" fdprocessedid="2p44zn">Log In</button>
  </div>
       </div>
     </div>
    </div>
    
    </>
  )
}

export default Login;
