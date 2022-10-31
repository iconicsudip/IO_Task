import React from 'react'
import SearchBar from './SearchBar';
import Movie from './Movie';
import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom'

export default function OpenProdMovies() {
    const params = useParams()
    const movies = useSelector((state)=>{
        return state.movies;
    })
    const user_movies = movies.filter((mov)=>{
        return mov.producer===params.prodid;
    });
    return (
        <>
            <SearchBar />
            <div className='movielists'>
                {user_movies.length!==0?user_movies.map((um,ind)=>{
                    return <Movie key={'producermovieslists'+ind} movieid={um.movie_id} />;
                }):<h1>Currently any movies are not present</h1>}
            </div>
        </>
    )
}
