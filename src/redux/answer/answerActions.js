import {SUCCESS,FAIL} from './answerTypes'

export const succeeded = success => {
    return {
        type: SUCCESS,
        payload: success
    }
}


export const failed = fail => {
    return {
        type: FAIL,
        payload: fail
    }
}
