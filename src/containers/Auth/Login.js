import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
// import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
// import { userLoginSuccess } from "../../store/actions/userActions";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            userName: event.target.value,
        });
    };

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleLogin = async () => {
        this.setState({ errMessage: "" });
        try {
            let response = await handleLoginApi(
                this.state.userName,
                this.state.password
            );
            if (response && response.code !== 0) {
                this.setState({ errMessage: response.message });
            }
            if (response && response.code === 0) {
                this.props.userLoginSuccess(response.data);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
        }
    };

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            this.handleLogin();
        }
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Your User name "
                                onChange={(event) => this.handleOnChangeUsername(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Enter Your Password"
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => { this.handleShowHidePassword(); }}>
                                    <i
                                        className={
                                            this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"
                                        }
                                    ></i>
                                </span>
                            </div>
                        </div>

                        <div className="col-12" style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => { this.handleLogin(); }}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">
                                Forgot Your Password
                            </span>
                        </div>

                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">
                                Or Login With:
                            </span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g "></i>
                            <i className="fab fa-facebook-f "></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) =>
        //     dispatch(actions.adminLoginSuccess(adminInfo)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
