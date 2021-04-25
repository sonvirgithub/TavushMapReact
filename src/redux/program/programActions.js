import {
    DELETE_PROGRAM, EDIT_PROGRAM,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, EDIT_SUCCESS,
    ADD_SHOW, ADD_SUCCESS, 
    FETCH_PROGRAMS_REQUEST,
    FETCH_PROGRAMS_SUCCESS,
    FETCH_PROGRAMS_FAILURE,
    CHANGE_ISSELECT,FIND_SCROLL_ID,NAXKIN_PROG,
    SELECT_COMMUNITIES, SELECTED_SUPPORTS,ERROR_CITY_MSG,
    ERROR_ORG_MSG,ERROR_SUP_MSG,ERROR_STATUS_MSG,ALL_SUPPORTS
} from './programTypes'

export const findScrollId = id => {
    return {
        type: FIND_SCROLL_ID,
        payload: id
       
    }
}

export const allSupports = prog => {
    return {
        type: ALL_SUPPORTS,
        payload: prog
       
    }
}
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

export const cityErrMessage = (cityErr,orgErr,suppErr,statusErr) => {
    return {
        type: ERROR_CITY_MSG,
        payload: cityErr
    }
}
export const orgErrMessage = (orgErr) => {
    return {
        type: ERROR_ORG_MSG,
        payload: orgErr
    }
}
export const supErrMessage = (supErr) => {
    return {
        type: ERROR_SUP_MSG,
        payload: supErr
    }
}
export const statusErrMessage = (statusErr) => {
    return {
        type: ERROR_STATUS_MSG,
        payload: statusErr
    }
}
export const funcnaxkinProg = (prog) => {
    return {
        type: NAXKIN_PROG,
        payload: prog
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
            //   dispatch(allSupports(programs))
              
            })

            .catch(err => {
                const errorMsg = err.message
                dispatch(fetchProgramsFailure(errorMsg))

            })
    }
}

