import React from 'react'
import Showactor from './Showactor'
import {useSelector} from 'react-redux';

export default function ActorLists() {
    const user_id = useSelector((state)=>{
        return state.userid
    })
    const users = useSelector((state)=>{
        return state.users;
    })
    const actors = users.filter((user)=>{
        return user.user_id===user_id;
    })
    return (
        <div className='actorlists'>
            <div className='movielists'>
                {actors[0].actors.length!==0?actors[0].actors.map((um,ind)=>{
                    return <Showactor key={"actor"+ind} actorid={um}/>;
                }):<h1>Currently any actors are not present</h1>}
            </div>
        </div>
    )
}
