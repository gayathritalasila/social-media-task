import { combineReducers } from 'redux';
import authReducer from "./src/components/Authentication/login.slice";
import postsSlice from "./src/components/Posts/posts.slice" ;

const rootReducer = combineReducers({
  login: authReducer,
  posts: postsSlice,
});

export default rootReducer;
