import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import  {connect}  from 'react-redux'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component{
    state = {
        purchasing: false,
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return (sum > 0)
    }

    purchaseHandler = () =>  {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        
        }
        
    }
    
    
    purchaseCancelHandler = () => this.setState({purchasing: false})
    
    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout');
    }

    render(){
        let orderSummary = null
        let burger = this.props.error ? <p>Ingredients Can't be Loaded</p> : null

        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        if(this.props.loading){
            orderSummary = <Spinner/>;

        }
        if(this.props.ings){          
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>   
                    <BuildControls
                    price={this.props.price}
                    ingredientAdded={this.props.onIncrementIngredient}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ingredientRemoved={this.props.onDecrementIngredient}
                    disabledArray={disabledInfo}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                    />
                </Aux>)
                    orderSummary = <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.props.price}
                    /> 
        }
        return(
            <Aux>
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }
}

const mapStateToProp = state =>{
    return{
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onIncrementIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
        onDecrementIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
}
export default connect(mapStateToProp, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))