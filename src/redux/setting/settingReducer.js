import {
    DELETE_USER, EDIT_USER,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, EDIT_SUCCESS,
    ADD_SHOW, ADD_SUCCESS,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
} from './settingTypes'


const initialState = {
    user: {},
    users: [],
    showEdit: false,
    showDelete: false,
    showAdd: false,
    loading: false,
    error: ''

}

const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_USER:
            return {
                ...state,
                user: action.payload,

            }

        case EDIT_USER:
            return {
                ...state,
                user: action.payload,

            }

        case DELETE_SHOW:
            return {
                ...state,
                showDelete: !state.showDelete,

            }
        case DELETE_SUCCESS:
            return {
                ...state,
                users: [...state.users.filter(c => c.id !== action.payload)]

            }
        case EDIT_SHOW:
            return {
                ...state,
                showEdit: !state.showEdit,

            }
        case EDIT_SUCCESS:
            return {
                ...state,
                users: [...state.users.map((user) => {
                    if (user.id === action.payload.id) {
                        return Object.assign({}, user, {
                            firstname: action.payload.firstname,
                            lastname: action.payload.lastname,

                        })
                    }
                    return user
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
                users: [...state.users, action.payload]

            }

        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        default: return state
    }
}

export default settingReducer