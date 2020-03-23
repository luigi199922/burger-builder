import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}
export const setIngredients = ( ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = ()=>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch =>{
        axios.get('ingredients/').then(res=>{
            let ingredients ={};
            //convert array of objects into one object
            for (var i = 0; i < res.data.length; i++) {
            ingredients[res.data[i].name] = res.data[i].amount;
            }
            dispatch(setIngredients(ingredients))
        })   
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        }) 
    }  
}

