import {
    MORE_INFO, CHANGE_SUPPORTS,ALL_SUPPORTS,
    MORE_INFO_SUCCESS,DELETE_SUPPORTS,EDIT_SUP_SUPPORTS
} from './moreInfoTypes'

export const moreInfoShow = show => {
    return {
        type: MORE_INFO,
        payload: show
      
    }
}
export const changeSupMoreInfo = prog => {

    return {
        type: CHANGE_SUPPORTS,
        payload: prog

    }
}

export const deleteSupMoreInfo = () => {

    return {
        type: DELETE_SUPPORTS,

    }
}
export const editSupMoreInfo = sup => {

    return {
        type: EDIT_SUP_SUPPORTS,
        payload: sup

    }
}
export const moreInfoProgram = prog => {
    return {
        type: MORE_INFO_SUCCESS,
        payload: prog
       
    }
}
export const allSupports = prog => {
    return {
        type: ALL_SUPPORTS,
        payload: prog
       
    }
}