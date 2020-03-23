import React from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

class Orders extends React.Component{
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token)
    }

    render(){
        let orders = <Spinner/>;
        if(!this.props.loading){
            orders = this.props.orders.map((order, key) =>{
                return <Order order={order} key={key}></Order>
            })
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))