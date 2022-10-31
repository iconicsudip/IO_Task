import React from 'react'
import { useParams,Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import Showactor from './Showactor';
import Showproducer from './Showproducer';

export default function Showmovie() {
    let params = useParams();
    const movies = useSelector((state)=>{
        return state.movies
    })
    const movie = movies.filter((mv)=>{
        return mv.movie_id===params.movieid
    })
    // console.log(movie)
    const {YOR,actors,name,plot,poster,producer} = movie[0];
    return (
        <div>
            <div className="rmdb-navigation">
                <div className="rmdb-navigation-content">
                    <Link to="/" style={{textDecoration: "none",color: "lightgray"}}>Home</Link>
                    <p>/</p>
                    <p>{name}</p>
                    
                </div>
            </div>
            <div className="rmdb-movieinfo" >
                <div className="rmdb-movieinfo-content">
                    <div className="rmdb-movieinfo-thumb">
                        <div className="rmdb-moviethumb">
                            <img src={poster} alt="moviethumb"/>
                        </div>
                    </div>
                    <div className="rmdb-movieinfo-text">
                        <h1>{name}</h1>
                        <h3>Year of release</h3>
                        <p>{YOR}</p>
                        <h3>PLOT</h3>
                        <p>{plot}</p>
                        <h3>PRODUCER</h3>
                        <div className="rmdb-director">
                            <Showproducer producerid={producer}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='actorlists'>
                <h1 style={{padding:"1rem"}}>Actors</h1>
                <div className='movielists'>
                    {actors.length!==0?actors.map((um,ind)=>{
                        return <Showactor key={"actors"+ind} actorid={um}/>
                    }):<h1>Currently any actors are not present</h1>}
                </div>
            </div>
        </div>
    )
}
