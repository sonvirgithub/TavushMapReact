import { SUCCESS, FAIL } from './answerTypes'


const initialState = {
    success: false,
    fail: false
}

const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
            return {
                ...state,
                success: action.payload,

            }
        case FAIL:
            return {
                ...state,
                fail: action.payload,

            }
        default: return state
    }
}

export default answerReducer