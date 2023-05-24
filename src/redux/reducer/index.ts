import { combineReducers } from "redux";
import { reducers } from './reducers'
export const reducer = combineReducers({
    data: reducers
})