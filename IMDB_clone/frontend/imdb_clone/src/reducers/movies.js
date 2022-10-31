const movies = (state=0,action)=>{
  var movie = JSON.parse(localStorage.getItem("demoData"));
  switch(action.type){
    case "DELETE_MOVIE":
        movie.movies = action.payload;
        localStorage.setItem("demoData",JSON.stringify(movie));
        return state=action.payload
      case "ADD_MOVIE":
        movie = JSON.parse(localStorage.getItem("demoData"));
        movie.movies = action.payload;
        localStorage.setItem("demoData",JSON.stringify(movie));
        return state=action.payload;
      case "MODIFY_MOVIE":
        movie.movies = action.payload;
        localStorage.setItem("demoData",JSON.stringify(movie));
        return state=action.payload;
      default:
        return state;
    }
  }
  export default movies;