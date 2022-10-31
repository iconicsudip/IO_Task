import React from 'react'
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux';
import Movie from './Movie'
import SearchBar from './SearchBar';

export default function OpenActorMovies() {
    const params = useParams()

    // console.log(params.actorid)
    const movies = useSelector((state)=>{
        return state.movies;
    })
    const user_movies = movies.filter((mov)=>{
        return mov.actors.includes(params.actorid)
    })
    // console.log(user_movies)
    return (
        <>
            <SearchBar />
            <div className='movielists'>
                {user_movies.length!==0?user_movies.map((um,ind)=>{
                    return <Movie key={'actormovielists'+ind} movieid={um.movie_id} />;
                }):<h1>Currently any movies are not present</h1>}
            </div>
        </>
    )
}
