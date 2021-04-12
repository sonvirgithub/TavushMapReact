import {
    DELETE_ORGANIZATION, EDIT_ORGANIZATION,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, EDIT_SUCCESS,
    ADD_SHOW, ADD_SUCCESS, GET_ORGANIZATIONS,
    FETCH_ORGANIZATIONS_REQUEST,
    FETCH_ORGANIZATIONS_SUCCESS,
    FETCH_ORGANIZATIONS_FAILURE
} from './organizationTypes'

const initialState = {
    org: {},
    organizations: [],
    showEdit: false,
    showDelete: false,
    showAdd: false,
    loading: false,
    error: ''

}

const organizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ORGANIZATION:
            return {
                ...state,
                org: action.payload,

            }

        case EDIT_ORGANIZATION:
            return {
                ...state,
                org: action.payload,

            }
        case DELETE_SHOW:
            return {
                ...state,
                showDelete: !state.showDelete,

            }
        case DELETE_SUCCESS:
            return {
                ...state,
                organizations: [...state.organizations.filter(c => c.id !== action.payload)]

            }
        case EDIT_SHOW:
            return {
                ...state,
                showEdit: !state.showEdit,

            }
        case EDIT_SUCCESS:
            return {
                ...state,
                organizations: [...state.organizations.map((organization) => {
                    if (organization.id === action.payload.id) {
                        return Object.assign({}, organization, {
                            nameEng: action.payload.nameEng,
                            nameArm: action.payload.nameArm,
                            contactPersonArm: action.payload.contactPersonArm,
                        })
                    }
                    return organization
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
                organizations: [...state.organizations, action.payload]

            }

        case GET_ORGANIZATIONS:
            return {
                ...state,
                organizations: action.payload,

            }

        case FETCH_ORGANIZATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_ORGANIZATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                organizations: action.payload,
                error: ''
            }
        case FETCH_ORGANIZATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                organizations: [],
                error: action.payload
            }
        default: return state
    }
}

export default organizationReducer