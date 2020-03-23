import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    }
}

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData, token) => {
    return  dispatch =>{
        // Headers
        const config ={
            headers : {
               "Content-Type": "application/json"
            }        
       }
       // If token, add to headers config
       if (token) {
           config.headers["Authorization"] = `Token ${token}`;
       }  
        dispatch(purchaseBurgerStart())
        axios.post('orders/',orderData, config).then(res => {
                dispatch(purchaseBurgerSuccess(res.data.created, orderData))
            }).catch(err => {
                console.log(err)
                dispatch(purchaseBurgerFail(err))
            })
    }  
}

export const purchaseInit = () =>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = (err) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: err
    }
}

export const fetchOrderStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        // Headers
         const config ={
             headers : {
                "Content-Type": "application/json"
             }        
        }
        // If token, add to headers config
        if (token) {
            config.headers["Authorization"] = `Token ${token}`;
        }  
        dispatch(fetchOrderStart())
        axios.get('orders', config).then(res => {
            dispatch(fetchOrderSuccess(res.data))
        })
        .catch( err =>{
            dispatch(fetchOrderFailed(err))
        })
    }
}