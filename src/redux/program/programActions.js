import {
    DELETE_PROGRAM, EDIT_PROGRAM,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, EDIT_SUCCESS,
    ADD_SHOW, ADD_SUCCESS, 
    FETCH_PROGRAMS_REQUEST,
    FETCH_PROGRAMS_SUCCESS,
    FETCH_PROGRAMS_FAILURE,
    CHANGE_ISSELECT, SELECT_COMMUNITIES,
    SELECTED_SUPPORTS
} from './programTypes'
import axios from 'axios'

export const fetchProgramsRequest = () => {
    return {
        type: FETCH_PROGRAMS_REQUEST

    }
}

export const fetchProgramsSuccess = programs => {
    return {
        type: FETCH_PROGRAMS_SUCCESS,
        payload: programs

    }
}

export const fetchProgramsFailure = error => {
    return {
        type: FETCH_PROGRAMS_FAILURE,
        payload: error

    }
}

export const deleteProg = id => {
    return {
        type: DELETE_PROGRAM,
        payload: id
    }
}

export const editProg = prog => {
    return {
        type: EDIT_PROGRAM,
        payload: prog
    }
}

export const deleteShow = () => {
    return {
        type: DELETE_SHOW,

    }
}
export const progDeleteSuccess = id => {
    return {
        type: DELETE_SUCCESS,
        payload: id
    }
}

export const progEditSuccess = prog => {
    return {
        type: EDIT_SUCCESS,
        payload: prog
    }
}
export const progAddSuccess = prog => {
    return {
        type: ADD_SUCCESS,
        payload: prog
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

export const changeIsSelect = isSelect => {

    return {
        type: CHANGE_ISSELECT,
        payload: isSelect

    }
}
export const selectedSupports = prog => {

    return {
        type: SELECTED_SUPPORTS,
        payload: prog
       

    }
}

export const selectCommunities = communities => {

    return {
        type: SELECT_COMMUNITIES,
        payload: communities
       

    }
}


export const getPrograms = () => {
    return (dispatch) => {
        dispatch(fetchProgramsRequest)
        fetch("/api/programsForAdmin")
            .then((res) => res.json())
            .then((res) => {
              const programs = res.data
            
              dispatch(fetchProgramsSuccess(programs))
            })

            .catch(err => {
                const errorMsg = err.message
                dispatch(fetchProgramsFailure(errorMsg))

            })
    }
}

