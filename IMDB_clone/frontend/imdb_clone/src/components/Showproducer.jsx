import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {deleteMovie,deleteProducer,deleteUser,deleteActor} from '../actions/allActions'
import ShowProdDetails from './ShowProdDetails';

export default function Showproducer({producerid}) {
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
    const producer_details = producers.filter((mv)=>{
        return mv.prod_id===producerid
    })
    // console.log(producer_details)
    const handleopenProducer = ()=>{
        navigate(`/producer/movies/${producerid}`)
    }
    const producerDelete = (e)=>{
        if(window.confirm("Do you want to continue ?")===true){
            fetch(`http://localhost:5000/deleteproducer/${user_id}/${e.target.value}`,{
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
                navigate("/producers")
            })
        }else{
            alert("not deleted")
        }
        // console.log(e.target.value)
    }
    const handleMode=(e)=>{
        setMode(e.target.value)
    }
    const [producerdetails,setProducerDetails] = useState({
        name:producer_details[0].name,
        gender:producer_details[0].gender,
        DOB:producer_details[0].DOB,
        Bio:producer_details[0].Bio
    })
    const setDefault = (e)=>{
        setProducerDetails({
            name:producer_details[0].name,
            gender:producer_details[0].gender,
            DOB:producer_details[0].DOB,
            Bio:producer_details[0].Bio
        })
    }
    return (
        <>
            <div className="rmdb-grid-element" >
                <div className="rmdb-actor" onClick={handleopenProducer}>
                    <img src="../no_image.jpg" alt="actorthumb"/>
                    <div className="details">
                        <span className="rmdb-actor-name">{producer_details[0].name}</span>
                        <span className="rmdb-actor-character">{producer_details[0].Bio}</span>
                    </div>
                </div>
                <div className="button-option">
                    <button type="button" value={"view"} onClick={handleMode} data-bs-toggle="modal" data-bs-target={"#modal"+producerid} className="btn btn-info btn-sm">View</button>
                    <button type="button" value={"edit"} onClick={handleMode} data-bs-toggle="modal" data-bs-target={"#modal"+producerid} className="btn btn-warning btn-sm">Edit</button>
                    <button type="button" value={producerid} onClick={producerDelete} className="btn btn-danger btn-sm">Delete</button>
                </div>
            </div>
            <div className="modal fade" id={"modal"+producerid} tabIndex="-1" aria-labelledby={"modal"+producerid} data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{mode==="view"?"Producer Details":"Edit Producer"}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={setDefault} aria-label="Close"></button>
                        </div>
                        <ShowProdDetails mode={mode} producer_details={producer_details} producerdetails={producerdetails} setProducerDetails={setProducerDetails} />
                    </div>
                </div>
            </div>
        </>
    )
}
