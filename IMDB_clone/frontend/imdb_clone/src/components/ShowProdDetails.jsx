import React from 'react'
import {updateProducer} from '../actions/allActions'
import {useDispatch} from 'react-redux';

export default function ShowProdDetails({mode,producer_details,producerdetails,setProducerDetails}) {
    const dispatch = useDispatch();
    const setBio =(e)=>{
        setProducerDetails({...producerdetails,Bio:e.target.value})
    }
    const setDOB = (e)=>{
        setProducerDetails({...producerdetails,DOB:e.target.value})
    }
    const setGender =(e)=>{
        setProducerDetails({...producerdetails,gender:e.target.value})
    }
    const setDefault = (e)=>{
        setProducerDetails({
            name:producer_details[0].name,
            gender:producer_details[0].gender,
            DOB:producer_details[0].DOB,
            Bio:producer_details[0].Bio
        })
    }
    const setName = (e)=>{
        setProducerDetails({...producerdetails,name:e.target.value})
    }
    const updateDetails = (e)=>{
        const data = {...producer_details[0],name:producerdetails.name,gender:producerdetails.gender,DOB:producerdetails.DOB,Bio:producerdetails.Bio};
        dispatch(updateProducer(data))
    }
  return (
    <div className="modal-body">

    {mode==="view"?
          <>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" value={producer_details[0].name} className="form-control" aria-describedby="emailHelp" disabled readOnly/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
                <input type="text" value={producer_details[0].gender} className="form-control" aria-describedby="emailHelp" disabled readOnly/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth</label>
                <input type="date" value={producer_details[0].DOB} className="form-control" disabled readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Bio</label>
                <div className="input-group">
                    <textarea value={producer_details[0].Bio} className="form-control" aria-label="With textarea" disabled readOnly></textarea>
                </div>
            </div>
          </>
          :
          <>
          
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" onChange={setName} value={producerdetails.name} className="form-control" aria-describedby="emailHelp"/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
                <select onChange={setGender} className="form-select" id="inputGroupSelect01">
                    <option style={{display:"none"}} value={producerdetails.gender}>{producerdetails.gender}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth</label>
                <input type="date" onChange={setDOB} value={producerdetails.DOB} className="form-control" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Bio</label>
                <div className="input-group">
                    <textarea onChange={setBio} value={producerdetails.Bio} className="form-control" aria-label="With textarea"></textarea>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={setDefault} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={updateDetails} className="btn btn-primary">Save changes</button>
            </div>
          </>
          }
    </div>
  )
}
