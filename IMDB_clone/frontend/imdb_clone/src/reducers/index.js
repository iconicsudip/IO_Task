import users from "./users.js";
import userIdReducer from "./userId.js";
import actors from "./actors.js";
import producers from "./producers.js";
import movies from "./movies.js";

import {combineReducers} from 'redux';

const mainReducers = combineReducers({
    users:users,
    actors:actors,
    producers:producers,
    movies:movies,
    userid:userIdReducer
});

export default mainReducers;