import {
    MORE_INFO,
    MORE_INFO_SUCCESS
} from './moreInfoTypes'
import moment from 'moment'


const initialState = {
    moreInfoShow: false,
    moreInfoProg: {},
    startDate: "",
    endDate: ""

}

const moreInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case MORE_INFO:
            return {
                ...state,
                moreInfoShow: action.payload
            }
        case MORE_INFO_SUCCESS:
            return {
                ...state,
               moreInfoProg: action.payload,
               startDate: moment(action.payload.startDate).format('DD.MM.YYYY'),
               endDate: moment(action.payload.endDate).format('DD.MM.YYYY')
            }
            default: return state
        }
    }
    export default moreInfoReducer