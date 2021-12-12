import * as type from "../actions/types";

const initialState = {
    isAuthenticate: false,
    isLoading: true,
    products: [],
    productDetail: []
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        default:
            return {
                ...state,
            }
        case type.GET_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                products: action.payload
            }
        case type.FAILED_GET_DATA:
            return {
                ...state,
                isAuthenticate: false,
                isLoading: false,
                products: initialState.products
            }
        case type.SEARCH_NAME_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                products: action.payload
            }
        case type.FAILED_SEARCH_NAME_DATA:
            return {
                ...state,
                isAuthenticate: false,
                isLoading: false,
                products: initialState.products
            }
        case type.ADD_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
            }
        case type.FAILED_ADD_DATA:
            return {
                ...state,
                isAuthenticate: false,
                isLoading: false,
            }
        case type.FILTER_STATUS_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                products: action.payload
            }
        case type.FAILED_FILTER_STATUS_DATA:
            return {
                ...state,
                isAuthenticate: false,
                isLoading: false,
                products: initialState.products
            }
        case type.DELETE_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                products: state.products.filter((item) => item.id !== action.payload)
            }
        case type.FAILED_DELETE_DATA:
            return {
                ...state,
                isAuthenticate: false,
                isLoading: false,
            }
        case type.GET_DETAIL_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                productDetail: action.payload
            }
        case type.FAILED_GET_DETAIL_DATA:
            return {
                ...state,
                isAuthenticate: false,
                isLoading: false,
                productDetail: initialState.productDetail
            }
        case type.UPDATE_DATA:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
            }
        case type.FAILED_UPDATE_DATA:
            return {
                ...state,
                isAuthenticate: false,
                isLoading: false,
            }
    }
};
