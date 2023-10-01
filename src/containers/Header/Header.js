import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuApp: [],
        }
    }
    componentDidMount() {
        let { userInfo } = this.props;

        if (userInfo && !_.isEmpty(userInfo)) {
            if (userInfo.roleId === USER_ROLE.ADMIN) {
                this.setState({
                    menuApp: adminMenu,
                })
            }
            if (userInfo.roleId === USER_ROLE.DOCTOR) {
                this.setState({
                    menuApp: doctorMenu,
                })
            }
            if (userInfo.roleId === USER_ROLE.PATIENT) {
                //
            }
        }
    }

    handleOnChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator trong quản lý trang của admin */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="languages">
                    <span className="welcome">
                        <FormattedMessage id="client.home-header.welcome" />
                        {userInfo && userInfo.firstName ? userInfo.firstName : ""}!
                    </span>
                    <span className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"} onClick={() => { this.handleOnChangeLanguage(LANGUAGES.VI) }}>VI</span>
                    <span className={language === LANGUAGES.EN ? "language-en active" : "language-en"} onClick={() => { this.handleOnChangeLanguage(LANGUAGES.EN) }}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
