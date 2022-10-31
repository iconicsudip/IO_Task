const actors = (state=0,action)=>{
    var actor = JSON.parse(localStorage.getItem("demoData"));
    switch(action.type){
      case "DELETE_ACTOR":
        actor.actors = action.payload;
        localStorage.setItem("demoData",JSON.stringify(actor));
        return state=action.payload
      case "ADD_ACTOR":
        actor.actors = action.payload;
        localStorage.setItem("demoData",JSON.stringify(actor));
        return state=action.payload;
      case "UPDATE_ACTOR":
        state.forEach((ac,ind)=>{
          if(ac.actor_id === action.payload.actor_id){
            state[ind]=action.payload;
          }
        })
        actor.actors = state;
        localStorage.setItem("demoData",JSON.stringify(actor));
        return state;
      case "MODIFY_ACTOR":
        actor.actors = action.payload;
        localStorage.setItem("demoData",JSON.stringify(actor));
        return state=action.payload;
      default:
        return state;
    }
  }
  export default actors;