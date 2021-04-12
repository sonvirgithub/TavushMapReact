import {
    DELETE_CATEGORY, EDIT_CATEGORY, EDIT_SUCCESS,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, ADD_SHOW, ADD_SUCCESS,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE
} from './categoryTypes'


const initialState = {
    category: {},
    categories: [],
    error: '',
    loading: false,
    showEdit: false,
    showDelete: false,
    showAdd: false

}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_CATEGORY:

            return {
                ...state,
                category: action.payload,
                // categories: [...state.categories.filter(c =>  c.id !== action.payload.id)]

            }

        case EDIT_CATEGORY:
            return {
                ...state,
                category: action.payload,

            }

        case DELETE_SHOW:
            return {
                ...state,
                showDelete: !state.showDelete,

            }
        case DELETE_SUCCESS:
            return {
                ...state,
                categories: [...state.categories.filter(c => c.id !== action.payload)]

            }
        case EDIT_SHOW:
            return {
                ...state,
                showEdit: !state.showEdit,

            }
        case EDIT_SUCCESS:
            return {
                ...state,
                categories: [...state.categories.map((category) => {
                    if (category.id === action.payload.id) {
                        return Object.assign({}, category, {
                            name_eng: action.payload.name_eng,
                            name_arm: action.payload.name_arm
                        })
                    }
                    return category
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
                categories: [...state.categories, action.payload]

            }
        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
                error: ''
            }
        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                categories: [],
                error: action.payload
            }
        default: return state
    }
}

export default categoryReducer