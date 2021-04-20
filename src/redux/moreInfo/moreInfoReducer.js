import {
    MORE_INFO, CHANGE_SUPPORTS,
    MORE_INFO_SUCCESS, DELETE_SUPPORTS
} from './moreInfoTypes'
import moment from 'moment'


const initialState = {
    moreInfoShow: false,
    moreInfoProg: {},
    startDate: "",
    endDate: "",
    suppForMoreInfo: []

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
                endDate: moment(action.payload.endDate).format('DD.MM.YYYY'),
                suppForMoreInfo: state.suppForMoreInfo
            }
        case CHANGE_SUPPORTS:
            action.payload.support.map((item) => {
                if (item.supports?.length > 0) {
                    item.supports.map((support) => {

                        state.suppForMoreInfo.push(support.name)
                    })
                }
            })
            return {
                ...state,
                suppForMoreInfo: state.suppForMoreInfo
            }

        case DELETE_SUPPORTS:

            return {
                ...state,
                suppForMoreInfo: []
            }
        default: return state
    }
}
export default moreInfoReducer