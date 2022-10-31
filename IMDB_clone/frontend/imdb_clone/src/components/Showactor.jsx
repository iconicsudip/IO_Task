import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {deleteMovie,deleteProducer,deleteUser,deleteActor} from '../actions/allActions'
import ShowActDetails from './ShowActDetails';

export default function Showactor({actorid}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mode,setMode] = useState('');
    const user_id = useSelector((state)=>{
        return state.userid
    })
    const actors = useSelector((state)=>{
        return state.actors
    })
    const users = useSelector((state)=>{
        return state.users;
    })
    const producers = useSelector((state)=>{
        return state.producers
    })
    const movies = useSelector((state)=>{
        return state.movies
    })
    const actor_details = actors.filter((mv)=>{
        return mv.actor_id===actorid
    });
    const handleopenActor = (e)=>{
        navigate(`/actor/movies/${actorid}`)
    }
    const actorDelete = (e)=>{
        if(window.confirm("Do you want to continue?")===true){
            fetch(`http://localhost:5000/deleteactor/${user_id}/${e.target.value}`,{
                method:'POST',
                body: JSON.stringify({users,actors,producers,movies}),
                headers:{
                    'Content-Type':'application/json',
                },
            }).then(response=>response.json()).then(json=>{
                const data = json
                // console.log(data);
                dispatch(deleteMovie(data.movies))
                dispatch(deleteProducer(data.producers))
                dispatch(deleteActor(data.actors))
                dispatch(deleteUser(data.users))
                navigate("/actors")
            })
        }else{
            alert("Not deleted")
        }
    }
    // console.log(actor_details)
    const handleMode=(e)=>{
        setMode(e.target.value)
    }
    const [actordetails,setActorDetails] = useState({
        name:actor_details[0].name,
        gender:actor_details[0].gender,
        DOB:actor_details[0].DOB,
        Bio:actor_details[0].Bio
    })
    const setDefault = (e)=>{
        setActorDetails({
            name:actor_details[0].name,
            gender:actor_details[0].gender,
            DOB:actor_details[0].DOB,
            Bio:actor_details[0].Bio
        })
    }
    return (
        <>
            <div className="rmdb-grid-element" >
                <div className="rmdb-actor" onClick={handleopenActor}>
                    <img src="../no_image.jpg" alt="actorthumb"/>
                    <div className="details">
                        <span className="rmdb-actor-name">{actor_details[0].name}</span>
                        <span className="rmdb-actor-character">{actor_details[0].Bio}</span>
                    </div>
                </div>
                <div className="button-option">
                    <button type="button" value={"view"} onClick={handleMode} data-bs-toggle="modal" data-bs-target={'#modal'+actorid} className="btn btn-info btn-sm">View</button>
                    <button type="button" value={"edit"} onClick={handleMode} data-bs-toggle="modal" data-bs-target={'#modal'+actorid} className="btn btn-warning btn-sm">Edit</button>
                    <button type="button" value={actorid} onClick={actorDelete} className="btn btn-danger btn-sm">Delete</button>
                </div>
            </div>
            <div className="modal fade" id={"modal"+actorid} tabIndex="-1" aria-labelledby={"modal"+actorid} data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{mode==="view"?"Actor Details":"Edit Actor"}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={setDefault} aria-label="Close"></button>
                        </div>
                        {mode==="view" || mode==="edit" ? <ShowActDetails mode={mode} actordetails={actordetails} setActorDetails={setActorDetails} actor_details={actor_details}/> :null}
                        
                    </div>
                </div>
            </div>
        </>
    )
}
