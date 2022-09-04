import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'

function Login() {
  
  
  const [email, setEmail] =useState('')
  const [password, setPassword]= useState('')
  const {Firebase} = useContext(FirebaseContext)
  const history =useHistory()
  function handleSubmit(e){
    e.preventDefault();
Firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
  history.push('/')
}).catch((error)=>{
  alert(error.message)
})
  }
  
  
  
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{history.push('/signup')}}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
