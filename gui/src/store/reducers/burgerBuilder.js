import * as actionType from '../actions/actionTypes'
import  {updateObject} from '../../shared/utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName] ,
        building: true
    }
    return updateObject(state, updatedState) 
}

const removeIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updatedSt = {
        ingredients : updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName] ,
        building: true,
    }
    return updateObject(state, updatedSt)
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionType.ADD_INGREDIENT: return addIngredient(state, action)          
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionType.SET_INGREDIENTS: return updateObject(state, {...state,ingredients: action.ingredients,error: false,totalPrice: 4,})
        case actionType.FETCH_INGREDIENTS_FAILED: return updateObject(state, {...state, error: true})
        default: return state
    }
    
}
export default reducer