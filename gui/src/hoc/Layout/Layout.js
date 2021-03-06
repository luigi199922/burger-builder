import React, { useState } from "react";
import Aux from "../Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(true);

  const sideDrawerCloser = () => {
    setShowSideDrawer(false);
  };
  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };
  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer open={showSideDrawer} closed={sideDrawerCloser} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
