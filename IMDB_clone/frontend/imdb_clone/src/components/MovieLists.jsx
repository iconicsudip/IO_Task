import React from 'react'
import {useSelector} from 'react-redux';
import Movie from './Movie'

export default function MovieLists() {
    const user_id = useSelector((state)=>{
        return state.userid
    })
    const users = useSelector((state)=>{
        return state.users;
    })
    const movies = users.filter((user)=>{
        return user.user_id===user_id;
    })
    return (
        <div className='movielists'>
            {movies[0].movies.length!==0?movies[0].movies.map((um,ind)=>{
                return <Movie key={'movielists'+ind} movieid={um} />;
            }):<h1>Currently any movies are not present</h1>}
        </div>
    )
}
