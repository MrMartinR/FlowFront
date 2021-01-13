import {
    REQUEST_PLATFORMSLIST,
    RECEIVE_PLATFORMSLIST,
    ERROR_REQUESTING_PLATFORMSLIST
  } from "./actions";
  
  const initialStore = {
    platformTable: null,
    isFetching: false,
    lastError: null,
    // listLoading: true,
    // actionsLoading: false, 
    // filteredTable: null,
    };
  
    const reducer = (state=initialStore, action?: any) =>  {
      switch (action.type) {
        case REQUEST_PLATFORMSLIST: {
            return {
                ...state,
                isFetching: true
            }
        }

        case RECEIVE_PLATFORMSLIST: {
            return {
                ...state,
                isFetching: false
            }
        }

        case ERROR_REQUESTING_PLATFORMSLIST: {
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
    
  