import * as actionType from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,

}

const purchaseBurgerSuccess = (state,action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId,
    }
        return updateObject(state, {...state, loading: false, orders: state.orders.concat(newOrder), purchased: true })
}

const purchaseBurgerFail = (state,action) => {
    return updateObject(state,{...state,loading: false,})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)     
        case actionType.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action)     
        case actionType.PURCHASE_BURGER_START: return updateObject(state,{...state,loading: true,})
        case actionType.PURCHASE_INIT: return updateObject(state,{...state,purchased: false,})
        case actionType.FETCH_ORDERS_START: return updateObject(state,{...state,loading: true,})
        case actionType.FETCH_ORDERS_SUCCESS: return updateObject(state,{...state,orders: action.orders,loading: false,})
        case actionType.FETCH_ORDERS_FAILED: return updateObject(state,{...state,loading: false,})
        default: return state
    }
}
export default reducer