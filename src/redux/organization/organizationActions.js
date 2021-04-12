import {
    DELETE_ORGANIZATION, EDIT_ORGANIZATION,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, EDIT_SUCCESS,
    ADD_SHOW, ADD_SUCCESS, GET_ORGANIZATIONS,
    FETCH_ORGANIZATIONS_REQUEST,
    FETCH_ORGANIZATIONS_SUCCESS,
    FETCH_ORGANIZATIONS_FAILURE
} from './organizationTypes'
import axios from 'axios'

export const fetchOrganizationsRequest = () => {
    return {
        type: FETCH_ORGANIZATIONS_REQUEST

    }
}

export const fetchOrganizationsSuccess = organizations => {
    return {
        type: FETCH_ORGANIZATIONS_SUCCESS,
        payload: organizations

    }
}

export const fetchOrganizationsFailure = error => {
    return {
        type: FETCH_ORGANIZATIONS_FAILURE,
        payload: error

    }
}

export const deleteOrg = org => {
    return {
        type: DELETE_ORGANIZATION,
        payload: org
    }
}

export const editOrg = org => {
    return {
        type: EDIT_ORGANIZATION,
        payload: org
    }
}

export const deleteShow = () => {
    return {
        type: DELETE_SHOW,

    }
}
export const orgDeleteSuccess = id => {
    return {
        type: DELETE_SUCCESS,
        payload: id
    }
}

export const orgEditSuccess = org => {
    return {
        type: EDIT_SUCCESS,
        payload: org
    }
}
export const orgAddSuccess = org => {
    return {
        type: ADD_SUCCESS,
        payload: org
    }
}

export const editShow = () => {
    return {
        type: EDIT_SHOW,

    }
}

export const addShow = () => {
    return {
        type: ADD_SHOW,

    }
}

// export const getOrganizations = organizations => {
//     return {
//         type: GET_ORGANIZATIONS,
//         payload: organizations

//     }
// }

export const getOrganizations = () => {
    return (dispatch) => {
        dispatch(fetchOrganizationsRequest)
        axios("/api/organizationsForAdmin").then(res => {

            const organizations = res.data.all
            dispatch(fetchOrganizationsSuccess(organizations))

        })
            .catch(err => {
                const errorMsg = err.message
                dispatch(fetchOrganizationsFailure(errorMsg))

            })
    }
}

