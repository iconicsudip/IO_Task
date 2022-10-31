import React from 'react';
import {updateActor} from '../actions/allActions'
import {useDispatch} from 'react-redux';

export default function ShowActDetails({mode,actor_details,actordetails,setActorDetails}) {

    const dispatch = useDispatch();
    const setBio =(e)=>{
        setActorDetails({...actordetails,Bio:e.target.value})
    }
    const setDOB = (e)=>{
        setActorDetails({...actordetails,DOB:e.target.value})
    }
    const setGender =(e)=>{
        setActorDetails({...actordetails,gender:e.target.value})
    }
    const setDefault = (e)=>{
        setActorDetails({
            name:actor_details[0].name,
            gender:actor_details[0].gender,
            DOB:actor_details[0].DOB,
            Bio:actor_details[0].Bio
        })
    }
    const setName = (e)=>{
        setActorDetails({...actordetails,name:e.target.value})
    }
    const updateDetails = (e)=>{
        const data = {...actor_details[0],name:actordetails.name,gender:actordetails.gender,DOB:actordetails.DOB,Bio:actordetails.Bio};
        dispatch(updateActor(data))
    }
  return (
    <div className="modal-body">

    {mode==="view"?
          <>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" value={actor_details[0].name} className="form-control" aria-describedby="emailHelp" disabled readOnly/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
                <input type="text" value={actor_details[0].gender} className="form-control" aria-describedby="emailHelp" disabled readOnly/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth</label>
                <input type="date" value={actor_details[0].DOB} className="form-control" disabled readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Bio</label>
                <div className="input-group">
                    <textarea value={actor_details[0].Bio} className="form-control" aria-label="With textarea" disabled readOnly></textarea>
                </div>
            </div>
          </>
          :
          <>
          
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input onChange={setName} type="text" value={actordetails.name} className="form-control" aria-describedby="emailHelp"/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
                <select onChange={setGender} className="form-select" id="inputGroupSelect01">
                    <option style={{display:"none"}} value={actordetails.gender}>{actordetails.gender}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth</label>
                <input type="date" onChange={setDOB} value={actordetails.DOB} className="form-control" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Bio</label>
                <div className="input-group">
                    <textarea onChange={setBio} value={actordetails.Bio} className="form-control" aria-label="With textarea"></textarea>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={setDefault} className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                <button onClick={updateDetails} type="button" className="btn btn-primary">Update changes</button>
            </div>
          </>
          }
    </div>
  )
}
