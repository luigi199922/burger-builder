import React from 'react'
import classes from './Order.module.css'
const Order = (props) => {
    return(
        <div className={classes.Order}>
            {/* Change DB Structure so that ingredients is an object */}
            <p>Ingredients: </p>
            <span>Salad({props.order.salad})</span>
            <p> Bacon({props.order.bacon})</p>
            <p> Cheese({props.order.cheese})</p>
            <p> Meat({props.order.meat})</p>
            {/* <p>Price: <strong>{props.order.totalPrice.toFixed(2)}</strong></p> */}
        </div>
    )
}
export default Order