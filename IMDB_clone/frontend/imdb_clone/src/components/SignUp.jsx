import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {addUser} from '../actions/allActions'
import {useNavigate} from 'react-router-dom'

export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state)=>{
        return state.users;
    })
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(signupform.name==="" || signupform.email==="" || signupform.password===""){
            alert("Please fill all details");
        }else{
            fetch("http://localhost:5000/signup",{
                method:"POST",
                body:JSON.stringify({users,...signupform}),
                headers:{
                    'Content-Type':'application/json',
                },
            }).then((response)=>{
                return response.json();
            }).then((json)=>{
                if(json.error){
                    alert(json.error)
                }else{
                    dispatch(addUser(json.users));
                    setSignUpForm({
                        name:"",
                        email:"",
                        password:""
                    })
                    navigate('/signin')
                }
            })
        }
    }
    const [signupform,setSignUpForm] = useState({
        name:"",
        email:"",
        password:""
    })
    const setEmail = (e)=>{
        setSignUpForm({...signupform,email:e.target.value});
    }
    const setPassword = (e)=>{
        setSignUpForm({...signupform,password:e.target.value});
    }
    const setName = (e)=>{
        setSignUpForm({...signupform,name:e.target.value});
    }
    return (
        <div className='signupform'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input onChange={setName} value={signupform.name} type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={setEmail} value={signupform.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={setPassword} value={signupform.password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
