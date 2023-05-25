import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className="header-logo" src={logo}></img>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.specialty"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.search-doctor"></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.health-facility"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.select-room"></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.doctor"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.choose-doctor"></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.examination-package"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.general-health-check"></FormattedMessage></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support"></FormattedMessage>
                            </div>
                            <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}><span onClick={() => { this.changeLanguage(LANGUAGES.VI); }}>VI</span></div>
                            <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}><span onClick={() => { this.changeLanguage(LANGUAGES.EN); }}>EN</span></div>
                        </div>
                    </div >

                </div >
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1"><FormattedMessage id="content-up.title1"></FormattedMessage></div>
                        <div className="title2"><FormattedMessage id="content-up.title2"></FormattedMessage></div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm Chuyên Khoa Khám Bệnh"></input>
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="far fa-hospital"></i></div>
                                <div className="text-child"><FormattedMessage id="content-down.child1"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                <div className="text-child"><FormattedMessage id="content-down.child2"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-procedures"></i></div>
                                <div className="text-child"><FormattedMessage id="content-down.child3"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-flask"></i></div>
                                <div className="text-child"><FormattedMessage id="content-down.child4"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-user-md"></i></div>
                                <div className="text-child"><FormattedMessage id="content-down.child5"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-briefcase-medical"></i></div>
                                <div className="text-child"><FormattedMessage id="content-down.child6"></FormattedMessage></div>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
