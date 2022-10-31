import React,{useState} from 'react'
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();
  const users = useSelector((state)=>{
      return state.users;
  })
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(signinform.email==="" || signinform.password===""){
      alert("Please fill all details");
    }else{
      fetch("http://localhost:5000/login",{
          method:"POST",
          body:JSON.stringify({users,...signinform}),
          headers:{
              'Content-Type':'application/json',
          },
      }).then((response)=>{
          return response.json();
      }).then((json)=>{
          if(json.error){
              alert(json.error)
          }else{
              localStorage.setItem("token",json.token)
              // dispatch(addUser(json.users));
              setSignInForm({
                  name:"",
                  email:"",
                  password:""
              })
              navigate('/')
          }
      })
    }
  }
  const [signinform,setSignInForm] = useState({
    email:"",
    password:""
  })
  const setEmail = (e)=>{
    setSignInForm({...signinform,email:e.target.value});
  }
  const setPassword = (e)=>{
    setSignInForm({...signinform,password:e.target.value});
  }
  return (
      <div className='signupform' >
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange={setEmail} value={signinform.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={setPassword} value={signinform.password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
