import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

const Logout = React.lazy(()=> import("./containers/Auth/Logout/Logout"))
const Checkout = React.lazy(()=> import("./containers/Checkout/Checkout"))
const Orders = React.lazy(() => import("./containers/Orders/Orders"))
const Auth = React.lazy(() => import("./containers/Auth/Auth"))
const BurgerBuilder = React.lazy(() => import("./containers/BurgerBuilder/BurgerBuilder"))

const renderComponent = (Component) => {
  return data => <Suspense fallback={<div>Loading...</div>}><Component {...data}/></Suspense>
}

const App = ({onTryAutoSignup, isAuthenticated}) => {
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route exact path="/auth" component={renderComponent(Auth)}></Route>
      <Route exact path="/" component={renderComponent(BurgerBuilder)}></Route>
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={renderComponent(Checkout)}></Route>
        <Route path="/orders" component={renderComponent(Orders)}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route exact path="/auth" component={renderComponent(Auth)}></Route>
        <Route exact path="/" component={renderComponent(BurgerBuilder)}></Route>
      </Switch>
    );
  }
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
