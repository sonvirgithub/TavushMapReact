import {
    DELETE_PROGRAM, EDIT_PROGRAM,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, EDIT_SUCCESS,
    ADD_SHOW, ADD_SUCCESS,
    FETCH_PROGRAMS_REQUEST,
    FETCH_PROGRAMS_SUCCESS, FIND_SCROLL_ID, NAXKIN_PROG,
    FETCH_PROGRAMS_FAILURE, SELECT_COMMUNITIES,
    CHANGE_ISSELECT, SELECTED_SUPPORTS, ERROR_CITY_MSG,
    ERROR_ORG_MSG, ERROR_SUP_MSG, ERROR_STATUS_MSG, ALL_SUPPORTS
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
    cities: [],
    organizations: [],
    cityErr: { editError: "", classname: '' },
    orgErr: { editError: "", classname: '' },
    supErr: { editError: "", classname: '' },
    statusErr: { editError: "", classname: '' },
    supName: [],
    support: [],
    scrollId: 0,
    naxkinProg: {},
    select_endDate: false

}

const programReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PROGRAM:
            return {
                ...state,
                program: action.payload,
            }

        case EDIT_PROGRAM:
            console.log(action.payload.endDate, ",,,,,", action.payload.startDate);

            if (action.payload.endDate === null || action.payload.endDate === "") {

            } else {
                const endDate = moment(action.payload.endDate).toDate()
                console.log(endDate);
                action.payload.endDate = endDate
                state.select_endDate = true
            }

            const startDate = moment(action.payload.startDate).toDate()
            action.payload.startDate = startDate
            console.log(action.payload.endDate, action.payload.startDate);

            return {
                ...state,
                program: action.payload,
                edit: false,
                support: action.payload.support,
                naxkinProg: action.payload,
                select_endDate: state.select_endDate
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
                // support: state.support,
                support: action.payload.support,
                edit: true,

            }
        case ADD_SHOW:
            return {
                ...state,
                showAdd: !state.showAdd,
                support: []

            }
        case ADD_SUCCESS:
            return {
                ...state,
                programs: [...state.programs, action.payload],
                isSelect: action.payload.isSelect,

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
                error: '',

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
                isSelect: action.payload,

            }

        case SELECTED_SUPPORTS:
            if (action.payload.support.length > 0) {
                action.payload.support.map((item) => {
                    if (item.supports?.length > 0) {
                        item.supports.map((support) => {

                            state.isSelect.push({
                                supportid: support.supportid,
                                name: support.name
                            })

                        })
                    }
                })
            }
            return {
                ...state,
                isSelect: state.isSelect
            }
        case SELECT_COMMUNITIES:

            return {
                ...state,
                cities: action.payload
            }
        case ERROR_CITY_MSG:
            return {
                ...state,
                cityErr: action.payload,

            }
        case ERROR_ORG_MSG:
            return {
                ...state,
                orgErr: action.payload,

            }
        case ERROR_SUP_MSG:
            return {
                ...state,
                supErr: action.payload,

            }
        case ERROR_STATUS_MSG:
            return {
                ...state,
                statusErr: action.payload,

            }

        case ALL_SUPPORTS:

            action.payload.map((prog) => {
                prog.support.map((support) => {
                    support.supports.map((sup) => {
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
        case FIND_SCROLL_ID:
            return {
                ...state,
                scrollId: action.payload,

            }
        case NAXKIN_PROG:
            return {
                ...state,
                communities: action.payload,

            }
        default: return state
    }
}

export default programReducer