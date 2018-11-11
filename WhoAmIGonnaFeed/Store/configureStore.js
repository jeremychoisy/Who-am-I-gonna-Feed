import {createStore} from 'redux';
import modifySearchHistory from './Reducers/SearchHistoryReducer'


// create Store with reducer function modifySearchHistory
export default createStore(modifySearchHistory)
