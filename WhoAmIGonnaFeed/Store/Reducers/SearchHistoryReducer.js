const initialState = { searchHistory : []}

// reducer function ModifysearchHistory
function ModifySearchHistory( state = initialState, action){
  let nextState
  const itemIndex = state.searchHistory.findIndex(item => item === action.value)
  switch(action.type){
    case 'ADD_ITEM':
      if(itemIndex === -1){
        nextState={
          ...state,
          searchHistory:[...state.searchHistory, action.value]
        }
      }
      return nextState || state
    case 'REMOVE_ITEM':
      nextState={
        ...state,
        searchHistory: state.searchHistory.filter(item => item !== action.value)
      }
      return nextState || state
    default:
      return state
    }
  }

  export default ModifySearchHistory
