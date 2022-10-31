const userIdReducer = (state = null,action)=>{
    var userid = JSON.parse(localStorage.getItem("demoData"));
    switch (action.type) {
        case 'AUTHENTICATED':
            userid.userid = action.payload;
            localStorage.setItem("demoData",JSON.stringify(userid))
            return state=action.payload;
        default:
            return state;
    }
}

export default userIdReducer;