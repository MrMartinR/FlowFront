import {
    REQUEST_PLATFORMS_LIST,
    RECEIVE_PLATFORMS_LIST,
    ERROR_REQUESTING_PLATFORMS_LIST
  } from "./actions";
  
  const initialStore = {
    platformTable: [],
    isFetching: false,
    lastError: null,
    };
  
    const reducer = (state=initialStore, action?: any) =>  {
      switch (action.type) {
        case REQUEST_PLATFORMS_LIST: {
            return {
                ...state,
                isFetching: true
            }
        }

        case RECEIVE_PLATFORMS_LIST: {
            return {
                ...state,
                platformTable: [...action.PLATFORMS_LIST],
                isFetching: false
            }
        }

        case ERROR_REQUESTING_PLATFORMS_LIST: {
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
    
  