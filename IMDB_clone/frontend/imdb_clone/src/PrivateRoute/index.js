import React,{useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import {userAuthenticated} from '../actions/allActions'
const PrivateRoute = ({children})=>{
    const userid = useSelector((state)=>{
        return state.userid
    })
    const dispatch = useDispatch();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        fetch('http://localhost:5000/isauth',{
            headers:{
                "x-access-token":token
            }
        }).then((response)=>{
            return response.json()
        }).then((json)=>{
            if(json.error){
                alert(json.error)
            }
            if(json.user_id){
                dispatch(userAuthenticated(json.user_id))
            }
        })
    },[dispatch])
    // console.log(localStorage.getItem("valid"))
    return userid===null?<Navigate to="/signin"/>:children;
}
export default PrivateRoute;
