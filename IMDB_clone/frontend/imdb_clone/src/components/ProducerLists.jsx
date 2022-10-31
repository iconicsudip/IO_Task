import React from 'react'
import {useSelector} from 'react-redux';
import Showproducer from './Showproducer';

export default function ProducerLists() {
    const user_id = useSelector((state)=>{
        return state.userid
    })
    const users = useSelector((state)=>{
        return state.users;
    })
    const producers = users.filter((user)=>{
        return user.user_id===user_id;
    })
    // console.log(producers[0].producers)
    return (
        <div className='actorlists'>
            <div className='movielists'>
                {producers[0].producers.length!==0?producers[0].producers.map((um,ind)=>{
                    return <Showproducer key={"producers"+ind} producerid={um}/>;
                }):<h1>Currently any producers are not present</h1>}
            </div>
        </div>
    )
}
