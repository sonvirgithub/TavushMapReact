import {
    DELETE_PROGRAM, EDIT_PROGRAM,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, EDIT_SUCCESS,
    ADD_SHOW, ADD_SUCCESS, 
    FETCH_PROGRAMS_REQUEST,
    FETCH_PROGRAMS_SUCCESS,
    FETCH_PROGRAMS_FAILURE
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

export const deleteProg = prog => {
    return {
        type: DELETE_PROGRAM,
        payload: prog
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

export const getPrograms = () => {
    return (dispatch) => {
        dispatch(fetchProgramsRequest)
        axios("/api/organizationsForAdmin").then(res => {

            const programs = res.data.all
            dispatch(fetchProgramsSuccess(programs))

        })
            .catch(err => {
                const errorMsg = err.message
                dispatch(fetchProgramsFailure(errorMsg))

            })
    }
}

