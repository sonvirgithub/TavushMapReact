import {
    DELETE_PROGRAM, EDIT_PROGRAM,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, EDIT_SUCCESS,
    ADD_SHOW, ADD_SUCCESS,
    FETCH_PROGRAMS_REQUEST,
    FETCH_PROGRAMS_SUCCESS,
    FETCH_PROGRAMS_FAILURE,
    CHANGE_ISSELECT, SELECTED_SUPPORTS
} from './programTypes'
import moment from 'moment'

const initialState = {
    program: {},
    programs: [],
    showEdit: false,
    showDelete: false,
    showAdd: false,
    loading: false,
    error: '',
    isSelect: [],
    edit: false,

}

const programReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PROGRAM:
            return {
                ...state,
                program: action.payload,

            }

        case EDIT_PROGRAM:

            const startDate = moment(action.payload.startDate).toDate()
            const endDate = moment(action.payload.endDate).toDate()

            action.payload.startDate = startDate
            action.payload.endDate = endDate

            return {
                ...state,
                program: action.payload,
                edit: false
            }

        case DELETE_SHOW:
            return {
                ...state,
                showDelete: !state.showDelete,

            }
        case DELETE_SUCCESS:
            return {
                ...state,
                programs: [...state.programs.filter(c => c.id !== action.payload)]

            }
        case EDIT_SHOW:
            return {
                ...state,
                showEdit: !state.showEdit,
              

            }
        case EDIT_SUCCESS:
           
            return {
                ...state,
                programs: [...state.programs.map((program) => {
                    if (program.id === action.payload.id) {
                        return Object.assign({}, program, {
                            budget: action.payload.budget,
                            community: action.payload.community,
                            contact_arm: action.payload.contact_arm,
                            contact_eng: action.payload.contact_eng,
                            description_arm: action.payload.description_arm,
                            description_eng: action.payload.description_eng,
                            endDate: action.payload.endDate,
                            id: action.payload.id,
                            isDonor: action.payload.isDonor,
                            manager_arm: action.payload.manager_arm,
                            manager_eng: action.payload.manager_eng,
                            organization: action.payload.organization,
                            programName_arm: action.payload.programName_arm,
                            programName_eng: action.payload.programName_eng,
                            startDate: action.payload.startDate,
                            status: action.payload.status,
                            statusId: action.payload.statusId,
                            support: action.payload.support,
                            

                        })
                    }
                    return program
                })],
                isSelect: state.isSelect,
                edit: true
            }
        case ADD_SHOW:
            return {
                ...state,
                showAdd: !state.showAdd,

            }
        case ADD_SUCCESS:
            return {
                ...state,
                programs: [...state.programs, action.payload]

            }

        case FETCH_PROGRAMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_PROGRAMS_SUCCESS:
            return {
                ...state,
                loading: false,
                programs: action.payload,
                error: ''
            }
        case FETCH_PROGRAMS_FAILURE:
            return {
                ...state,
                loading: false,
                programs: [],
                error: action.payload
            }
        case CHANGE_ISSELECT:

            return {
                ...state,
                isSelect: action.payload
            }
        case SELECTED_SUPPORTS:
            if (action.payload.support.length > 0) {


                action.payload.support.map((item) => {
                    if (item.supports.length > 0) {
                        item.supports.map((support) => {

                            state.isSelect.push({
                                supportid: support.supportid
                            })
                        })
                    }
                })
            }
            return {
                ...state,
                isSelect: state.isSelect
            }


        default: return state
    }
}

export default programReducer