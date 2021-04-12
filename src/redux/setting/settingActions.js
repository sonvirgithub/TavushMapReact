import {
    DELETE_USER, EDIT_USER,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, EDIT_SUCCESS,
    ADD_SHOW, ADD_SUCCESS,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
} from './settingTypes'
import axios from 'axios'

export const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST

    }
}

export const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users

    }
}

export const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error

    }
}

export const deleteUser = user => {
    return {
        type: DELETE_USER,
        payload: user
    }
}

export const editUser = user => {
    return {
        type: EDIT_USER,
        payload: user
    }
}


export const userDeleteSuccess = id => {
    return {
        type: DELETE_SUCCESS,
        payload: id
    }
}

export const userEditSuccess = user => {
    return {
        type: EDIT_SUCCESS,
        payload: user
    }
}
export const userAddSuccess = user => {
    return {
        type: ADD_SUCCESS,
        payload: user
    }
}

export const deleteShow = () => {
    return {
        type: DELETE_SHOW,

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

export const getUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest)
        axios("/api/settings").then(res => {

            const users = res.data.data
            dispatch(fetchUsersSuccess(users))

        })
            .catch(err => {
                const errorMsg = err.message
                dispatch(fetchUsersFailure(errorMsg))

            })
    }
}

