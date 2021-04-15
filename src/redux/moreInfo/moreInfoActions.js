import {
    MORE_INFO, 
    MORE_INFO_SUCCESS
} from './moreInfoTypes'

export const moreInfoShow = show => {
    return {
        type: MORE_INFO,
        payload: show
      
    }
}

export const moreInfoProgram = prog => {
    return {
        type: MORE_INFO_SUCCESS,
        payload: prog
       
    }
}
