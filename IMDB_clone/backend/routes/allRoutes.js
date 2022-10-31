import express from "express";

import { 
    createUser,
    showUserMovies,
    addActor,
    addProducer ,
    addMovies,
    deleteMovie,
    deleteProducer,
    deleteActor,
    logIn,
    isAuth,
    verifyJWT,
    updateMovie
} from "../controllers/index.js";

const router = express.Router();

router.post("/usermovie/:user_id",showUserMovies);

router.post("/signup",createUser);
router.post("/addactor/:user_id",addActor);
router.post("/addproducer/:user_id",addProducer);
router.post("/addmovie/:user_id",addMovies);

router.post("/deletemovie/:user_id/:movie_id",deleteMovie);
router.post("/deleteproducer/:user_id/:prod_id",deleteProducer);
router.post("/deleteactor/:user_id/:actor_id",deleteActor);

router.post("/login",logIn);
router.get("/isauth",verifyJWT,isAuth);

router.post("/updatemovie/:movie_id",updateMovie);

export default router;