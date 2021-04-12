import {
    DELETE_PROGRAM, EDIT_PROGRAM,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, EDIT_SUCCESS,
    ADD_SHOW, ADD_SUCCESS, 
    FETCH_PROGRAMS_REQUEST,
    FETCH_PROGRAMS_SUCCESS,
    FETCH_PROGRAMS_FAILURE
} from './programTypes'

const initialState = {
    program: {},
    programs: [],
    showEdit: false,
    showDelete: false,
    showAdd: false,
    loading: false,
    error: ''

}

const programReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PROGRAM:
            return {
                ...state,
                program: action.payload,

            }

        case EDIT_PROGRAM:
            return {
                ...state,
                program: action.payload,

            }
        case DELETE_SHOW:
            return {
                ...state,
                showDelete: !state.showDelete,

            }
        case DELETE_SUCCESS:
            return {
                ...state,
                programs: [...state.organizations.filter(c => c.id !== action.payload)]

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
                            // nameEng: action.payload.nameEng,
                            // nameArm: action.payload.nameArm,
                            // contactPersonArm: action.payload.contactPersonArm,
                        })
                    }
                    return program
                })]
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
        default: return state
    }
}

export default programReducer