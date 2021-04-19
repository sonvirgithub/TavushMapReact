import {
    MORE_INFO, CHANGE_SUPPORTS,
    MORE_INFO_SUCCESS,DELETE_SUPPORTS
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
export const moreInfoProgram = prog => {
    return {
        type: MORE_INFO_SUCCESS,
        payload: prog
       
    }
}
