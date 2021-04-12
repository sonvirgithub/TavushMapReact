import {
    DELETE_SUPPORT,EDIT_SUPPORT, GET_SUPPORTS,
    DELETE_SHOW, DELETE_SUCCESS, EDIT_SHOW, 
    EDIT_SUCCESS, ADD_SHOW, ADD_SUCCESS,
    FETCH_SUPPORTS_REQUEST,
    FETCH_SUPPORTS_SUCCESS,
    FETCH_SUPPORTS_FAILURE
} from './supportTypeTypes'
import axios from 'axios'


export const fetchSupportsRequest = () => {
    return {
        type: FETCH_SUPPORTS_REQUEST

    }
}

export const fetchSupportsSuccess = organizations => {
    return {
        type: FETCH_SUPPORTS_SUCCESS,
        payload: organizations

    }
}

export const fetchSupportsFailure = error => {
    return {
        type: FETCH_SUPPORTS_FAILURE,
        payload: error

    }
}

export const supportDeleteSuccess = id => {
    return {
        type: DELETE_SUCCESS,
        payload: id
    }
}

export const supportEditSuccess = support => {
    return {
        type: EDIT_SUCCESS,
        payload: support
    }
}
export const supportAddSuccess = support => {
    return {
        type: ADD_SUCCESS,
        payload: support
    }
}

export const deleteSupportType = support => {
    return {
        type: DELETE_SUPPORT,
        payload: support
    }
}

export const editSupportType = support => {
    return {
        type: EDIT_SUPPORT,
        payload: support
    }
}

export const deleteShow = () => {
    return {
        type: DELETE_SHOW,
      
    }
}

export const editShow = () => {
    return {
        type: EDIT_SHOW,
       
    }
}

export const addShow = () => {
    return {
        type: ADD_SHOW,
        
    }
}

// export const getSupportTypes = supports => {
//     return {
//         type: GET_SUPPORTS,
//         payload: supports
        
        
//     }
// }

export const getSupportTypes = () => {
    return (dispatch) => {
        dispatch(fetchSupportsRequest)
        axios("/api/supportsForAdmin").then(res => {

            const supports = res.data.data
            dispatch(fetchSupportsSuccess(supports))

        })
            .catch(err => {
                const errorMsg = err.message
                dispatch(fetchSupportsFailure(errorMsg))

            })
    }
}


