import axios from "axios";
import * as type from "./types";
import { notification } from "antd";
import Swal from "sweetalert2";

const baseUrl = "https://60cb2f6921337e0017e440a0.mockapi.io";


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
    });
};

export const getAllProducts = () => async (dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/product`, {
            headers: {
                'content-type': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch({
                type: type.GET_DATA,
                payload: res.data,
            });
        }
    } catch (error) {
        dispatch({
            type: type.FAILED_GET_DATA,
            payload: error.response.data,
        });
    }
};

export const getDetailProduct = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/product/${id}`, {
            headers: {
                'content-type': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch({
                type: type.GET_DETAIL_DATA,
                payload: res.data
            });
        }
    } catch (error) {
        dispatch({
            type: type.FAILED_GET_DETAIL_DATA,
            payload: error.response.data,
        });
    }
};

export const searchProducts = (name) => async (dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/product`, {
            headers: {
                'content-type': 'application/json'
            },
            params: {
                name: name
            }
        })
        if (res.status === 200) {
            dispatch({
                type: type.SEARCH_NAME_DATA,
                payload: res.data,
            });
        } else {
            openNotificationWithIcon(
                "error",
                "Error",
                "Ada Kesalahan Request",
            );
        }
    } catch (error) {
        dispatch({
            type: type.FAILED_SEARCH_NAME_DATA,
            payload: error.response.data,
        });
        openNotificationWithIcon(
            "error",
            "Error",
            "Ada Kesalahan Request",
        );
    }
};

export const filterProducts = (status) => async (dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/product`, {
            headers: {
                'content-type': 'application/json'
            },
            params: {
                isActive: status
            }
        })
        if (res.status === 200) {
            dispatch({
                type: type.FILTER_STATUS_DATA,
                payload: res.data,
            });
        } else {
            openNotificationWithIcon(
                "error",
                "Error",
                "Ada Kesalahan Request",
            );
        }
    } catch (error) {
        dispatch({
            type: type.FAILED_FILTER_STATUS_DATA,
            payload: error.response.data,
        });
        openNotificationWithIcon(
            "error",
            "Error",
            "Ada Kesalahan Request",
        );
    }
};

export const deleteProducts = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`${baseUrl}/product/${id}`, {
            headers: {
                'content-type': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch({
                type: type.DELETE_DATA,
                payload: id
            });
        }
    } catch (error) {
        dispatch({
            type: type.FAILED_DELETE_DATA,
            payload: error.response.data,
        });
    }
};

export const addDataProducts = (values) => async (dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}/product`, values, {
            headers: {
                'content-type': 'application/json'
            }
        })
        if (res.status === 200 || res.status === 201) {
            dispatch({
                type: type.ADD_DATA,
                payload: res.data,
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Success Add Product',
            })
        }
    } catch (error) {
        dispatch({
            type: type.FAILED_ADD_DATA,
            payload: error.response.data,
        });
        Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'Error Add Product',
        })
    }
};

export const updateDataProducts = (id, values) => async (dispatch) => {
    try {
        const res = await axios.put(`${baseUrl}/product/${id}`, values, {
            headers: {
                'content-type': 'application/json'
            }
        })
        if (res.status === 200 || res.status === 201) {
            dispatch({
                type: type.UPDATE_DATA,
                payload: res.data,
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Success Update Product',
            })
        }
    } catch (error) {
        dispatch({
            type: type.FAILED_UPDATE_DATA,
            payload: error.response.data,
        });
        Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'Error Update Product',
        })
    }
};