const producers = (state=0,action)=>{
    var producer = JSON.parse(localStorage.getItem("demoData"));
    switch(action.type){
      case "DELETE_PRODUCER":
        producer.producers = action.payload;
        localStorage.setItem("demoData",JSON.stringify(producer));
        return state=action.payload
      case "ADD_PRODUCER":
        producer.producers = action.payload;
        localStorage.setItem("demoData",JSON.stringify(producer));
        return state=action.payload
      case "UPDATE_PRODUCER":
        state.forEach((ac,ind)=>{
          if(ac.prod_id === action.payload.prod_id){
            state[ind]=action.payload;
          }
        })
        producer.producers = state;
        localStorage.setItem("demoData",JSON.stringify(producer));
        return state
      case "MODIFY_PRODUCER":
        console.log(action.payload)
        if(action.payload!==undefined){
          producer.producers = action.payload;
          localStorage.setItem("demoData",JSON.stringify(producer));
        }
        return state=action.payload
      default:
        return state;
    }
  }
  export default producers;