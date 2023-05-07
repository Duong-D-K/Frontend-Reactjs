import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/login";
        //check login, if logged in then redirect to route "/system/user-manager"
        return <Redirect to={linkToRedirect} />;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
