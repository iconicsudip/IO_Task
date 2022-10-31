
import shortid from "shortid";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import {stringify} from "flatted";
let users = [
    {
      "name": "sudip",
      "email": "sudip@gmail.com",
      "password": "abc",
      "user_id": "tPkZqX6ML",
      "movies": [
        "cxVs_v4v0",
        "cxVs_v4v1"
      ],
      "actors": [
        "leElAh13M",
        "leElAh13M1"
      ],
      "producers": [
        "aQc9RmLmK",
        "aQc9RmLmL"
      ]
    }
  ]
let movies = [
    {
      "name": "ABCD",
      "YOR": "2019",
      "plot": "This movie based on dance.",
      "poster": "http://image.tmdb.org/t/p/w500/yw8NQyvbeNXoZO6v4SEXrgQ27Ll.jpg",
      "producer": "aQc9RmLmK",
      "actors": [
        "leElAh13M",
        "leElAh13M1"
      ],
      "movie_id": "cxVs_v4v0"
    },
    {
      "name": "ABCD2",
      "YOR": "2019",
      "plot": "This movie based on dance.",
      "poster": "http://image.tmdb.org/t/p/w500/yw8NQyvbeNXoZO6v4SEXrgQ27Ll.jpg",
      "producer": "aQc9RmLmL",
      "actors": [
        "leElAh13M"
      ],
      "movie_id": "cxVs_v4v1"
    }
  ]
let actors = [
    {
      "name": "SRK12",
      "gender": "Male",
      "DOB": "2001-01-01",
      "Bio": "Indian biggest actor",
      "actor_id": "leElAh13M",
      "movies": [
        "cxVs_v4v0",
        "cxVs_v4v1"
      ]
    },
    {
      "name": "SRK1",
      "gender": "Male",
      "DOB": "2000-01-01",
      "Bio": "Indian biggest actor",
      "actor_id": "leElAh13M1",
      "movies": [
        "cxVs_v4v0"
      ]
    }
  ]
let producers = [
    {
      "name": "Karan1",
      "gender": "Male",
      "DOB": "1999-01-01",
      "Bio": "Indian biggest producer",
      "prod_id": "aQc9RmLmK",
      "movies": [
        "cxVs_v4v0"
      ]
    },
    {
      "name": "Karan2",
      "gender": "Male",
      "DOB": "1999-01-01",
      "Bio": "Indian biggest producer",
      "prod_id": "aQc9RmLmL",
      "movies": ["cxVs_v4v1"]
    }
  ]

const generateToken = (email,id)=>{
    const token = jwt.sign({email:email,user_id:id},'testingtokengenerate')
    return token;
}
const verifyToken = (token)=>{
    const decoded = jwt.verify(token,'testingtokengenerate')
    return decoded;
}

// Showing User movies, Producer movies, Actors movies

export const showUserMovies = (req,res)=>{
    const users = req.body.users;
    const movies = users.filter((user)=>{
        return user.user_id===req.params.user_id;
    })
    if(movies.length===1){
        res.send({"user_movies":movies[0].movies});
    }else{
        res.status(400).send("Wrong userid");
    }
}
// Creating users,actors,producers
export const createUser = (req,res)=>{
    let usr  = req.body;
    let users = req.body.users
    const check_user = users.filter((user)=>{
        return user.email === usr.email;
    });
    const user_id = shortid.generate();
    if(check_user.length<1){
        usr.password = bcrypt.hashSync(usr.password,10)
        const token = generateToken(usr.email,user_id);
        users.push({email:usr.email,password:usr.password,user_id:user_id,movies:new Array(),actors:new Array(),producers:new Array(),token:token});
        res.send({users});
    }else{
        res.status(400).send({error:"User does exist please signin to continue"});
    }
}

export const addActor = (req,res)=>{
    let users = req.body.users;
    let actors = req.body.actors;
    const usr  = req.body.data;
    const actor_id = shortid.generate();
    const check_user = users.filter((user)=>{
        return user.user_id === req.params.user_id;
    });
    if(check_user.length===1){
        actors.push({...usr,actor_id:actor_id,movies:[]});
        check_user[0].actors.push(actor_id);
        res.send({users,actors});
    }else{
        res.status(400).send("Wrong userid");
    }
}

export const addProducer = (req,res)=>{
    let users = req.body.users;
    let producers = req.body.producers;
    const usr  = req.body.data;
    let producer_id = shortid.generate();
    const check_user = users.filter((user)=>{
        return user.user_id === req.params.user_id;
    });
    if(check_user.length===1){
        producers.push({...usr,prod_id:producer_id,movies:[]});
        check_user[0].producers.push(producer_id);
        res.send({users,producers});
    }else{
        res.status(400).send("Wrong userid");
    }
}

export const addMovies = (req,res)=>{
    let actors = req.body.actors;
    let producers = req.body.producers;
    let movies = req.body.movies;
    let users = req.body.users;
    const movie = req.body.data;
    let movie_id = shortid.generate();
    const check_user = users.filter((user)=>{
        return user.user_id === req.params.user_id;
    });
    if(check_user.length===1){
        movies.push({...movie,movie_id:movie_id})
        check_user[0].movies.push(movie_id);
        let get_producer = producers.filter((prod)=>{
            return prod.prod_id===movie.producer;
        })
        get_producer[0].movies.push(movie_id);
        if(movie.actors.length!==0){
            movie.actors.forEach((act)=>{
                let get_actor = actors.filter((a)=>{
                    return a.actor_id===act;
                })
                if(get_actor.length!==0){
                    get_actor[0].movies.push(movie_id);
                }
            });
        }
        res.send({users,producers,actors,movies});
    }else{
        res.status(400).send("Wrong userid");
    }
}

// Deleting movies, actors, producers

export const deleteMovie = (req,res)=>{
    let users = req.body.users;
    let producers = req.body.producers;
    let actors = req.body.actors;
    let movies = req.body.movies;
    const user_id = req.params.user_id;
    const movie_id = req.params.movie_id;
    const get_User = users.filter((usr)=>{
        return usr.user_id === user_id;
    });
    if(get_User.length===1){
        get_User[0].movies = get_User[0].movies.filter((mov)=>{
            return mov!==movie_id;
        })
        const movie = movies.filter((mov)=>{
            return mov.movie_id===movie_id
        })
        if(movie.length===1){
            let edited_producermovie = producers.filter((prod)=>{
                return prod.prod_id === movie[0].producer;
            });
            let ep= edited_producermovie[0].movies.filter((mov)=>{
                return mov!==movie_id;
            })
            if(ep.length===0){
                edited_producermovie[0].movies = [];
            }else{
                edited_producermovie[0].movies = ep;
            }
            movie[0].actors.forEach((act)=>{
                let edited_actormovie = actors.filter((a)=>{
                    return a.actor_id === act;
                });
                let ch = edited_actormovie[0].movies.filter((mov)=>{
                    return mov!==movie_id;
                })
                if(ch.length===0){
                    edited_actormovie[0].movies=[]
                }else{
                    edited_actormovie[0].movies = ch
                }
            })
            movies = movies.filter((mov)=>{
                return mov.movie_id!==movie_id;
            })
            res.send({users,producers,actors,movies})
        }else{
            res.status(400).send("Wrong movieid");
        }
    }else{
        res.status(400).send("Wrong userid");
    }
}

export const deleteProducer = (req,res)=>{
    let users = req.body.users;
    let producers = req.body.producers;
    let actors = req.body.actors;
    let movies = req.body.movies;
    // console.log(actors)
    const user_id = req.params.user_id;
    const prod_id =  req.params.prod_id;
    const get_User = users.filter((usr)=>{
        return usr.user_id === user_id;
    });
    if(get_User.length===1){
        let get_prod = producers.filter((prod)=>{
            return prod.prod_id===prod_id;
        })
        if(get_prod.length===1){
            let final_producers= producers.filter((prod)=>{
                return prod.prod_id!==prod_id;
            })
            producers = final_producers;
            get_User[0].producers = get_User[0].producers.filter((prod)=>{
                return prod!==prod_id;
            })
            let prod_movies = get_prod[0].movies;
            prod_movies.forEach((prodmov)=>{
                let select_mov = movies.filter((mov)=>{
                    return mov.movie_id===prodmov;
                });
                let selected_movie_actors = select_mov[0].actors;
                movies = movies.filter((mov)=>{
                    return mov.movie_id!==prodmov;
                })
                get_User[0].movies = get_User[0].movies.filter((mov)=>{
                    return mov!==prodmov;
                })
                selected_movie_actors.forEach((sma)=>{
                    //"act_id";
                    let select_actor = actors.filter((act)=>{
                        return act.actor_id===sma;
                    })
                    select_actor[0].movies = select_actor[0].movies.filter((sam)=>{
                        return sam !==prodmov;
                    })
                })
            })
            res.send({users,producers,actors,movies})
        }else{
            res.status(400).send("ALREADY_REMOVED");
        }
    }else{
        res.status(400).send("Wrong userid");
    }
}

export const deleteActor = (req,res)=>{
    let users = req.body.users;
    let producers = req.body.producers;
    let actors = req.body.actors;
    let movies = req.body.movies;
    const user_id = req.params.user_id;
    const actor_id =  req.params.actor_id;
    //check userid
    const get_User = users.filter((usr)=>{
        return usr.user_id === user_id;
    });
    if(get_User.length===1){
        //actor
        let get_actor = actors.filter((act)=>{
            return act.actor_id===actor_id;
        })
        // console.log(get_actor)
        actors = actors.filter((a)=>{
            return a.actor_id!==actor_id;
        })
        if(get_actor.length===1){
            //movie + user_actors
            get_actor[0].movies.forEach((am)=>{
                let get_movie = movies.filter((mov)=>{
                    return am===mov.movie_id;
                })
                get_movie[0].actors = get_movie[0].actors.filter((ma)=>{
                    return ma!==actor_id;
                })
            })
            get_User[0].actors = get_User[0].actors.filter((act)=>{
                return act!==actor_id;
            })
            res.send({users,producers,actors,movies});
        }else{
            res.status(400).send("ALREADY_REMOVED");
        }
    }else{
        res.status(400).send("Wrong userid");
    }
    
}


//login user

export const logIn = (req,res)=>{
    let users = req.body.users
    const email =  req.body.email;
    const password = req.body.password;
    const get_user = users.filter((user)=>{
        return user.email===email;
    })
    if(get_user.length===1){
        if(bcrypt.compareSync(password,get_user[0].password)){
            const token = generateToken(email,get_user[0].user_id)
            res.send({user_id:get_user[0].user_id,token});
        }else{
            res.status(401).send({error:"wrong credentials"});
        }
    }else{
        res.status(401).send({error:"USER_NOT_EXIST"});
    }
    
}

export const isAuth = (req,res)=>{
    res.send({user_id:req.user_id,success:"You successfully loggedin"});
}
export const verifyJWT = (req,res,next)=>{
    const token = req.headers["x-access-token"];
    if(!token){
        res.send({error:"We need a token to verify"})
    }else{
        try{
            const response = verifyToken(token);
            req.user_id = response.user_id;
            next();
        }catch{
            res.send({error:"We need a token to verify"})
        }
    }
}

//update Movies 
export const updateMovie = (req,res)=>{
    let movies = req.body.movies;
    let producers = req.body.producers;
    let actors = req.body.actors;
    let data = req.body.data;
    const getMovie = movies.filter((mov)=>{
        return mov.movie_id===req.params.movie_id;
    })
    const modify = ()=>{
        getMovie[0].actors.forEach((id)=>{
            const actor = actors.filter((a)=>{
                return a.actor_id===id;
            })
            actor[0].movies = actor[0].movies.filter((mov)=>{
                return mov!==req.params.movie_id;
            })
        })
        data.actors.forEach((id)=>{
            const actor = actors.filter((a)=>{
                return a.actor_id===id;
            })
            actor[0].movies = actor[0].movies.filter((mov)=>{
                return mov!==req.params.movie_id;
            })
            actor[0].movies.push(req.params.movie_id);
        })
        
    }
    if(getMovie[0].producer!==data.producer){
        const new_producer = producers.filter((p)=>{
            return p.prod_id===data.producer;
        })
        const check = new_producer[0].movies.filter((e)=>{
            return e===req.params.movie_id;
        })
        if(check.length===0){
            new_producer[0].movies.push(req.params.movie_id);
            const old_producer = producers.filter((p)=>{
                return p.prod_id===getMovie[0].producer;
            });
            old_producer[0].movies = old_producer[0].movies.filter((ol)=>{
                return ol!==req.params.movie_id;
            });
            modify();
        }else{
            modify();
        }
    }else{
        
        modify()
        
    }
    movies.forEach((mov,ind)=>{
        if(mov.movie_id===req.params.movie_id){
            movies[ind] = {...movies[ind],...req.body.data}
        }
    });
    res.send({movies,actors,producers})
}