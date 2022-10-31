const users = (state=0,action)=>{
  var user = JSON.parse(localStorage.getItem("demoData"));
  switch(action.type){
    case "DELETE_USER":
      user.users = action.payload;
      localStorage.setItem("demoData",JSON.stringify(user));
      return state=action.payload
    case "MODIFY_USER":
      user.users = action.payload;
      localStorage.setItem("demoData",JSON.stringify(user));
      return state=action.payload
    case "ADD_USER":
      user.users = action.payload;
      localStorage.setItem("demoData",JSON.stringify(user));
      return state=action.payload;
    default:
      return state;
  }
}
export default users;