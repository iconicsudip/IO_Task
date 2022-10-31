import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate } from "react-router-dom";
import {addActor,addProducer,modifyUser,addMovie,modifyActor,modifyProducer} from '../actions/allActions'

export default function Modal({type,Fields,setFields}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_id = useSelector((state)=>{
        return state.userid
    })
    const producers = useSelector((state)=>{
        return state.producers
    })
    const actors = useSelector((state)=>{
        return state.actors
    })
    const users = useSelector((state)=>{
        return state.users;
    })
    const getmovies = useSelector((state)=>{
        return state.movies;
    })
    const movies = users.filter((user)=>{
        return user.user_id===user_id;
    })
    const handleAddOne = (e)=>{
        e.preventDefault();
        if(window.confirm("Do you want to continue ?")===true){
            if(type==="actor"){
                if(Fields.name==="" || Fields.Bio==="" || Fields.DOB==="" || Fields.gender===""){
                    alert(`fill all the details of an ${type}`);
                }else{
                    fetch(`http://localhost:5000/addactor/${user_id}`,{
                        method:'POST',
                        body: JSON.stringify({data:{name:Fields.name,gender:Fields.gender,DOB:Fields.DOB,Bio:Fields.Bio},users,actors}),
                        headers:{
                            'Content-Type':'application/json',
                        },
                    }).then(response=>response.json()).then(json=>{
                        const data = json
                        dispatch(addActor(data.actors))
                        dispatch(modifyUser(data.users))
                        navigate("/actors")
                    })
                }
            }else if(type==="producer"){
                if(Fields.name==="" || Fields.Bio==="" || Fields.DOB==="" || Fields.gender===""){
                    alert(`fill all the details of a ${type}`);
                }else{
                    fetch(`http://localhost:5000/addproducer/${user_id}`,{
                        method:'POST',
                        body: JSON.stringify({data:{name:Fields.name,gender:Fields.gender,DOB:Fields.DOB,Bio:Fields.Bio},users,producers}),
                        headers:{
                            'Content-Type':'application/json',
                        },
                    }).then(response=>response.json()).then(json=>{
                        const data = json
                        dispatch(addProducer(data.producers))
                        dispatch(modifyUser(data.users))
                        navigate("/actors")
                    })
                }
            }else if(type==="movie"){
                if(Fields.name==="" || Fields.plot==="" || Fields.poster==="" || Fields.producer==="" || Fields.YOR==="" || Fields.actors.length===0){
                    alert(`fill all the details of a ${type}`);
                }else{
                    fetch(`http://localhost:5000/addmovie/${user_id}`,{
                        method:'POST',
                        body: JSON.stringify({data:{name:Fields.name,plot:Fields.plot,poster:Fields.poster,producer:Fields.producer,YOR:Fields.YOR,actors:Fields.actors},users,producers,movies:getmovies,actors}),
                        headers:{
                            'Content-Type':'application/json',
                        },
                    }).then(response=>response.json()).then(json=>{
                        const data = json
                        dispatch(addMovie(data.movies))
                        dispatch(modifyUser(data.users))
                        dispatch(modifyActor(data.actors))
                        dispatch(modifyProducer(data.produecrs))
                        navigate("/")
                    })
                }
            }
        }else{
            alert(`${type} not added`)
        }
    }
    const setName = (e)=>{
        setFields({...Fields,name:e.target.value});
    }
    const setGender = (e)=>{
        // console.log(e.target.value)
        setFields({...Fields,gender:e.target.value});
    }
    const setDOB = (e)=>{
        setFields({...Fields,DOB:e.target.value});
    }
    const setBio = (e)=>{
        setFields({...Fields,Bio:e.target.value});
    }
    const setPoster = (e)=>{
        if(e.target.files[0].size<=52428800){
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onloadend = ()=> {
                setFields({...Fields,poster:reader.result.toString()});
            };
        }else{
            alert("File size should be below 50mb")
            setFields({...Fields,poster:""});
            e.target.value = "No file chosen";
        }
    }
    const setYOR = (e)=>{
        setFields({...Fields,YOR:e.target.value})
    }
    const setProducer = (e)=>{
        setFields({...Fields,producer:e.target.value})
    }
    const setPlot = (e)=>{
        setFields({...Fields,plot:e.target.value})
    }
    const setActors = (e)=>{
        let act = Fields.actors;
        if(e.target.checked){
            act.push(e.target.value);
        }else{
            act = act.filter((a)=>{
                return a!==e.target.value;
            })
        }
        setFields({...Fields,actors:act})
    }
    const handleClose = ()=>{
        setFields({
            name:"",
            gender:"",
            DOB:"",
            Bio:"",
            YOR:"",
            plot:"",
            actors:new Array(),
            producer:"",
            poster:""
        })
    }
    
    return (
        <div className="modal-body">
            <form onSubmit={handleAddOne}>
                {type==="actor"?
                    <>
                        <div className="mb-3">
                            <label  className="form-label">Name</label>
                            <input onChange={setName} value={Fields.name} type="text" className="form-control" />
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
                            <select onChange={setGender} value={Fields.gender} className="form-select" id="inputGroupSelect01">
                                <option defaultValue="choose">Choose...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Date of Birth</label>
                            <input onChange={setDOB} value={Fields.DOB} type="date" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Bio</label>
                            <div className="input-group">
                                <textarea onChange={setBio} value={Fields.Bio} className="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleAddOne} type="button" className="btn btn-primary">Add {type}</button>
                        </div>
                    </>
                : type==="producer" ?
                    <>
                        <div className="mb-3">
                            <label  className="form-label">Name</label>
                            <input onChange={setName} value={Fields.name} type="text" className="form-control"/>
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
                            <select onChange={setGender} value={Fields.gender} className="form-select" id="inputGroupSelect01">
                                <option defaultValue="choose">Choose...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Date of Birth</label>
                            <input onChange={setDOB} value={Fields.DOB} type="date" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Bio</label>
                            <div className="input-group">
                                <textarea onChange={setBio} value={Fields.Bio} className="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleAddOne} type="button" className="btn btn-primary">Add {type}</button>
                        </div>
                    </>
                : type==="movie" ?
                    <>
                        <div className="mb-3">
                            <label  className="form-label">Name</label>
                            <input onChange={setName} value={Fields.name} type="text" className="form-control"/>
                        </div>
                        
                        <div className="mb-3">
                            <label  className="form-label">Year of Release</label>
                            <input onChange={setYOR} type="text" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Plot</label>
                            <div className="input-group">
                                <textarea onChange={setPlot} className="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>
                        <div className="input-group mb-3" style={{flexDirection:"column"}}>
                            <label htmlFor="inputGroupSelect01">Actors</label>
                            <div className="actors-list" >
                                {movies[0].actors.length!==0?movies[0].actors.map((up,ind)=>{
                                    return (
                                        <div key={"actors"+ind} className="form-check">
                                            <input onChange={setActors} className="form-check-input" type="checkbox" value={up} id="flexCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                {actors.filter((p)=>{
                                                    return p.actor_id===up;
                                                })[0].name}
                                            </label>
                                        </div>
                                    )
                                }):null}
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Producer</label>
                            <select onChange={setProducer}  className="form-select" id="inputGroupSelect01" >
                                <option defaultValue="choose" >Choose...</option>
                                {movies[0].producers.length!==0?movies[0].producers.map((up,ind)=>{
                                    return <option key={"modal2"+ind} value={up}>{producers.filter((p)=>{
                                        return p.prod_id===up;
                                    })[0].name}</option>;
                                }):null}
                                
                            </select>
                        </div>
                        <div className="input-group mb-3">
                            <label  className="form-label">Poster</label>
                            <div className="input-group mb-3">
                                <input onChange={setPoster} type="file" className="form-control" id="inputGroupFile01" accept="image/*"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleAddOne} type="button" className="btn btn-primary">Add {type}</button>
                        </div>
                    </>
                :
                    null
                }
            </form>
        </div>
    )
}
