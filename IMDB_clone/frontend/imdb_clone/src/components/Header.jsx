import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom";
import Modal from './Modal'
import {useSelector} from 'react-redux';


export default function Header() {
    const [modal,setModal] = useState("")
    const userid = useSelector((state)=>{
        return state.userid;
    })
    const navigate = useNavigate();
    const [Fields,setFields] = useState({
        name:"",
        gender:"",
        DOB:"",
        Bio:"",
        YOR:"",
        plot:"",
        actors:new Array(),
        producer:"",
        poster:""
    });
    const handleopenModal = (e)=>{
        setModal(e.target.name)
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
    const handleLogout = ()=>{
        if(window.confirm("Do you want to logout ?")){
            localStorage.setItem("token",null);
            const d = JSON.parse(localStorage.getItem("demoData"));
            d.userid = null;
            localStorage.setItem("demoData",JSON.stringify(d));
            navigate("/signin")
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">IMDB</a>
                <button className="navbar-toggler" type="button" value={""} onClick={handleopenModal} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav justify-content-center" style={{width: "100%",alignItems:"center"}}>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" >Home</Link>
                        </li>
                        {userid?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/actors" >Actors</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/producers" >Producers</Link>
                                </li>
                                <li className="nav-item">
                                    <button type="button" onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signin" >Signin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup" >Signup</Link>
                                </li>
                            </>
                        }
                    </ul>
                    {userid?
                        <>
                            <div className="add-button">
                                <div className="btn-group dropstart">
                                    <button type="button" className="btn btn-primary dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                                        Add
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link name={"movie"} className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleopenModal}>Add Movie</Link></li>
                                        <li><Link name={"actor"} className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleopenModal}>Add Actor</Link></li>
                                        <li><Link name={"producer"} className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleopenModal}>Add Producer</Link></li>
                                    </ul>
                                </div>
                                
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add {modal}</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            {modal==="actor"?<Modal type={modal}  Fields={Fields} setFields={setFields}/>:modal==="producer"?<Modal type={modal}  Fields={Fields} setFields={setFields}/>:modal==="movie"?<><Modal type={modal}  Fields={Fields} setFields={setFields}/></>: null}
                                            
                                            <div className="buttons">
                                                
                                                {modal==="actor"?
                                                    <>
                                                        <button name={"movie"} onClick={handleopenModal} type="button" className="btn btn-info">Add Movie</button>
                                                        <button name={"producer"} onClick={handleopenModal} type="button" className="btn btn-info">Add Producer</button>
                                                    </>
                                                :
                                                modal==="movie"?
                                                    <>
                                                        <button name={"actor"} onClick={handleopenModal} type="button" className="btn btn-info">Add Actor</button>
                                                        <button name={"producer"} onClick={handleopenModal} type="button" className="btn btn-info">Add Producer</button>
                                                    </>
                                                :
                                                modal==="producer"?
                                                    <>
                                                        <button name={"movie"} onClick={handleopenModal} type="button" className="btn btn-info">Add Movie</button>
                                                        <button name={"actor"} onClick={handleopenModal} type="button" className="btn btn-info">Add Actor</button>
                                                    </>
                                                :
                                                null
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </>
                    :null}
                    
                </div>
            </div>
        </nav>
    )
}
