import {
    REQUEST_ORIGINATORS,
    RECEIVE_ORIGINATORS,
    ERROR_REQUESTING_ORIGINATORS
  } from "./actions";
  
  const initialStore = {
    originators: [],
    isFetching: false,
    update: null,
    lastError: null,
    };
  
    const reducer = (state=initialStore, action?: any) =>  {
      switch (action.type) {
        case REQUEST_ORIGINATORS: {
            return {
                ...state,
                isFetching: true
            }
        }

        case RECEIVE_ORIGINATORS: {
            return {
                ...state,
                originators: [...action.originators],
                isFetching: false
            }
        }

        case ERROR_REQUESTING_ORIGINATORS: {
            return {
                ...state,
                isFetching: false,
                lastError: action.error
            }
        }
        
        default: {
          return state;
        }
    }
    }
    
    export default reducer;
    
  