export const showAll = (data)=>{
    return {
        type:'USER_ALL',
        payload:data
    }
}
export const deleteMovie = (data)=>{
    return {
        type:'DELETE_MOVIE',
        payload:data
    }
}
export const deleteActor = (data)=>{
    return {
        type:'DELETE_ACTOR',
        payload:data
    }
}
export const deleteProducer = (data)=>{
    return {
        type:'DELETE_PRODUCER',
        payload:data
    }
}
export const deleteUser = (data)=>{
    return {
        type:'DELETE_USER',
        payload:data
    }
}
export const addUser = (data)=>{
    return {
        type:'ADD_USER',
        payload:data
    }
}
export const addActor = (data)=>{
    return {
        type:'ADD_ACTOR',
        payload:data
    }
}
export const addProducer = (data)=>{
    return {
        type:'ADD_PRODUCER',
        payload:data
    }
}
export const addMovie = (data)=>{
    return {
        type:'ADD_MOVIE',
        payload:data
    }
}
export const modifyUser = (data)=>{
    return {
        type:'MODIFY_USER',
        payload:data
    }
}
export const modifyActor = (data)=>{
    return {
        type:'MODIFY_ACTOR',
        payload:data
    }
}
export const modifyProducer = (data)=>{
    return {
        type:'MODIFY_PRODUCER',
        payload:data
    }
}
export const modifyMovie = (data)=>{
    return {
        type:'MODIFY_MOVIE',
        payload:data
    }
}
export const updateActor = (data)=>{
    return {
        type:'UPDATE_ACTOR',
        payload:data
    }
}
export const updateProducer = (data)=>{
    return {
        type:'UPDATE_PRODUCER',
        payload:data
    }
}
export const userAuthenticated = (data)=>{
    return {
        type:'AUTHENTICATED',
        payload:data
    }
}