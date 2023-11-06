import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Headers = () => {

    const navigation = useNavigate()

    const [user, setUser] = useState(null)

    useEffect(() =>{
        const u = localStorage.getItem("user")
          setUser(u)
    },[])

const handleLogout = () => {

    localStorage.clear();
    navigation('/login')
}

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">TODO APP</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" fdprocessedid="t4j2nk">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home
            <span className="visually-hidden">(current)</span>
          </Link>
        </li>
        
        {
            user ? <li className="nav-item">
            <a className="nav-link" onClick={handleLogout} style={{cursor:"pointer"}}>Log Out</a>
          </li>
          :
          <>
          <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
          </li>
         <li className="nav-item">
          <Link className="nav-link" to="/login">Log In</Link>
        </li>
          </>
        }
        
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Headers;
