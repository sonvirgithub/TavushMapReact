import {
    DELETE_CATEGORY, EDIT_CATEGORY, EDIT_SUCCESS,
    DELETE_SHOW, DELETE_SUCCESS,
    EDIT_SHOW, ADD_SHOW, ADD_SUCCESS,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE
} from './categoryTypes'
import axios from 'axios'


export const fetchCategoriesRequest = () => {
    return {
        type: FETCH_CATEGORIES_REQUEST

    }
}

export const fetchCategoriesSuccess = categories => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        payload: categories

    }
}

export const fetchCategoriesFailure = error => {
    return {
        type: FETCH_CATEGORIES_FAILURE,
        payload: error

    }
}

export const deleteCategory = category => {
    return {
        type: DELETE_CATEGORY,
        payload: category
    }
}

export const editCategory = category => {
    return {
        type: EDIT_CATEGORY,
        payload: category
    }
}

export const deleteShow = () => {
    return {
        type: DELETE_SHOW,

    }
}

export const categoryDeleteSuccess = id => {
    return {
        type: DELETE_SUCCESS,
        payload: id
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
export const categoryEditSuccess = category => {
    return {
        type: EDIT_SUCCESS,
        payload: category
    }
}
export const categoryAddSuccess = category => {
    return {
        type: ADD_SUCCESS,
        payload: category
    }
}

export const getCategories = () => {
    return (dispatch) => {
        dispatch(fetchCategoriesRequest)
        axios("/api/categories").then(res => {

            const categories = res.data.data
            dispatch(fetchCategoriesSuccess(categories))

        })
            .catch(err => {
                const errorMsg = err.message
                dispatch(fetchCategoriesFailure(errorMsg))

            })
    }
}


