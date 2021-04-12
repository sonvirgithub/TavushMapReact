import {
    DELETE_SUPPORT,
    EDIT_SUPPORT, GET_SUPPORTS,DELETE_SUCCESS,
    DELETE_SHOW, EDIT_SHOW, EDIT_SUCCESS,
     ADD_SHOW, ADD_SUCCESS,
    FETCH_SUPPORTS_REQUEST,
    FETCH_SUPPORTS_SUCCESS,
    FETCH_SUPPORTS_FAILURE
} from './supportTypeTypes'


const initialState = {
    supportType: {},
    supportTypes: [],
    categoryTypes: [],
    showEdit: false,
    showDelete: false,
    showAdd: false,
    loading: false,
    error: ''

}

const supportTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_SUPPORT:
            return {
                ...state,
                supportType: action.payload,

            }

        case EDIT_SUPPORT:
            return {
                ...state,
                supportType: action.payload,

            }

        case DELETE_SHOW:
            return {
                ...state,
                showDelete: !state.showDelete,

            }
        case DELETE_SUCCESS:
            return {
                ...state,
                supportTypes: [...state.supportTypes.filter(c => c.id !== action.payload)]

            }
        case EDIT_SHOW:
            return {
                ...state,
                showEdit: !state.showEdit,

            }
        case EDIT_SUCCESS:
            return {
                ...state,
                supportTypes: [...state.supportTypes.map((support) => {
                    if (support.id === action.payload.id) {
                        return Object.assign({}, support, {
                            name_eng: action.payload.name_eng,
                            name_arm:  action.payload.name_arm,
                            categoryId: action.payload.categoryId,
                            categoryName: action.payload.categoryName,
                        })
                    }
                    return support
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
                supportTypes: [...state.supportTypes, action.payload]

            }

        case GET_SUPPORTS:
            return {
                ...state,
                supportTypes: action.payload,

            }

        case FETCH_SUPPORTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUPPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                supportTypes: action.payload,
                error: ''
            }
        case FETCH_SUPPORTS_FAILURE:
            return {
                ...state,
                loading: false,
                supportTypes: [],
                error: action.payload
            }
        default: return state

    }

}

export default supportTypeReducer