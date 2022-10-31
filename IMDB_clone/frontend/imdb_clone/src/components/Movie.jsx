import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {deleteMovie,deleteProducer,deleteUser,deleteActor,modifyActor,modifyMovie,modifyProducer} from '../actions/allActions'


export default function Movie({movieid}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_id = useSelector((state)=>{
        return state.userid
    })
    const users = useSelector((state)=>{
        return state.users;
    })
    const movies = useSelector((state)=>{
        return state.movies
    })
    const actors = useSelector((state)=>{
        return state.actors
    })
    const producers = useSelector((state)=>{
        return state.producers
    })
    const movie = movies.filter((mv)=>{
        return mv.movie_id===movieid
    })
    const user_details = users.filter((p)=>{
        return p.user_id === user_id;
    })
    const [Fields,setFields] = useState({
        name:movie[0].name,
        YOR:movie[0].YOR,
        plot:movie[0].plot,
        actors:movie[0].actors,
        producer:movie[0].producer,
        poster:movie[0].poster
    });
    // console.log(movie)
    const handleOpenMovie = (e)=>{
        navigate(`/movie/${movieid}`)
        // console.log(e.target)
    }
    // console.log(users,actors,producers,movies)
    const movieDelete = (e)=>{
        if(window.confirm("Do you want to continue ?")===true){
            fetch(`http://localhost:5000/deletemovie/${user_id}/${e.target.value}`,{
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
            })
        }else{
            alert("Not deleted")
        }
        // console.log(e.target.value)
    }
    const editMovie = (e)=>{
        e.preventDefault();
        // dispatch(updateMovie(data))
        fetch(`http://localhost:5000/updatemovie/${movieid}`,{
            method:"POST",
            body:JSON.stringify({data:Fields,movies,actors,producers}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            return response.json();
        }).then((json)=>{
            console.log(json)
            dispatch(modifyMovie(json.movies));
            dispatch(modifyActor(json.actors));
            dispatch(modifyProducer(json.producers))
        })
    }
    const setName = (e)=>{
        setFields({...Fields,name:e.target.value});
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
    const setPoster = (e)=>{
        if(e.target.files[0].size<=52428800){
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onloadend = ()=> {
                setFields({...Fields,poster:reader.result.toString()});
            };
        }else{
            alert("File size should be below 50mb")
            setFields({...Fields,poster:movie[0].poster});
            e.target.value = "No file chosen";
        }
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
    const setDefault = (e)=>{
        setFields({
            name:movie[0].name,
            YOR:movie[0].YOR,
            plot:movie[0].plot,
            actors:movie[0].actors,
            producer:movie[0].producer,
            poster:movie[0].poster
        });
    }

    return (
        <div className="all">
            <div className='movieposter' value={movie[0].movie_id} onClick={handleOpenMovie}>
                <img src={movie[0].poster} alt="" />
            </div>
            <div className="button-option">
                <button type="button" value={"edit"} data-bs-toggle="modal" data-bs-target={"#staticBackdrop"+movie[0].movie_id} className="btn btn-warning btn-sm">Edit</button>
                <button type="button" value={movie[0].movie_id} onClick={movieDelete} className="btn btn-danger btn-sm">Delete</button>
            </div>
            <div className="modal fade" id={"staticBackdrop"+movie[0].movie_id} data-bs-backdrop="static" data-bs-keyboard="false"  tabIndex="-1" aria-labelledby={"modal"+movie[0].movie_id} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Edit Movie</h1>
                            <button type="button" onClick={setDefault} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editMovie} >
                                <div className="mb-3">
                                    <label  className="form-label">Name</label>
                                    <input onChange={setName} value={Fields.name} type="text" className="form-control"/>
                                </div>
                                
                                <div className="mb-3">
                                    <label  className="form-label">Year of Release</label>
                                    <input onChange={setYOR} value={Fields.YOR} type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Plot</label>
                                    <div className="input-group">
                                        <textarea onChange={setPlot} value={Fields.plot} className="form-control" aria-label="With textarea"></textarea>
                                    </div>
                                </div>
                                <div className="input-group mb-3" style={{flexDirection:"column"}}>
                                    <label htmlFor="inputGroupSelect01">Actors</label>
                                    <div className="actors-list" >
                                        {user_details[0].actors.length!==0?user_details[0].actors.map((up,ind)=>{
                                            return (
                                                <div key={"actors"+ind} className="form-check">
                                                    <input onChange={setActors} className="form-check-input" type="checkbox" value={up} id="flexCheckDefault" checked={Fields.actors.filter((ch)=>{return ch===up}).length===1? "checked":null}/>
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
                                    <select onChange={setProducer} value={Fields.producer}  className="form-select" id="inputGroupSelect01" >
                                        <option defaultValue="choose" >Choose...</option>
                                        {user_details[0].producers.length!==0?user_details[0].producers.map((up,ind)=>{
                                            return <option key={"modal2"+ind} value={up}>{producers.filter((p)=>{
                                                return p.prod_id===up;
                                            })[0].name}</option>;
                                        }):null}
                                        
                                    </select>
                                </div>
                                <div className="poster">
                                    <label  className="form-label">Poster</label>
                                    <div className="poster-images">
                                        <img src={movie[0].poster} alt="movie_poster" />
                                        <span>to</span>
                                        <img src={Fields.poster} alt="" />
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group mb-3">
                                        <input onChange={setPoster}  type="file" className="form-control" id="inputGroupFile01" accept="image/*"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={setDefault} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={editMovie} value={movie[0].movie_id} type="button" className="btn btn-primary">Save movie</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
