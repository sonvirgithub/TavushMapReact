import {
    MORE_INFO, CHANGE_SUPPORTS, ALL_SUPPORTS,
    MORE_INFO_SUCCESS, DELETE_SUPPORTS, EDIT_SUP_SUPPORTS
} from './moreInfoTypes'
import moment from 'moment'


const initialState = {
    show: false,
    moreInfoProg: {},
    startDate: "",
    endDate: "",
    suppForMoreInfo: [],
    supNames: [],
    names: []

}

const moreInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case MORE_INFO:

            return {
                ...state,
                show: action.payload
            }
        case MORE_INFO_SUCCESS:

        if(action.payload.endDate === null) {
             const endDate = ""
             state.endDate = endDate
        } else {
            const endDate = moment(action.payload.endDate).format('DD.MM.YYYY')
            state.endDate = endDate
        }

            return {
                ...state,
                moreInfoProg: action.payload,
                startDate: moment(action.payload.startDate).format('DD.MM.YYYY'),
                endDate: state.endDate
               
            }
        case CHANGE_SUPPORTS:
            if (action.payload?.support.length > 0) {
                action.payload.support?.map((item) => {
                    if (item.supports?.length > 0) {
                        item.supports.map((support) => {

                            state.suppForMoreInfo.push(support.name)
                        })
                    }

                })
            }
            return {
                ...state,
                suppForMoreInfo: state.suppForMoreInfo
            }

        case DELETE_SUPPORTS:

            return {
                ...state,
                suppForMoreInfo: []
            }
        case EDIT_SUP_SUPPORTS:
            return {
                ...state,
                suppForMoreInfo: action.payload
            }

        case ALL_SUPPORTS:

            action.payload.map((prog) => {
                prog.support.map((support) => {
                    support.supports.map((sup)=>{
                        state.supNames.push({
                            id: prog.id,
                            name: sup.name,
                            supportId: sup.supportid
    
                        })
                    })
                   
                })
            })
           

            return {
                ...state,
                supNames: state.supNames
            }
        default: return state
    }



}
export default moreInfoReducer