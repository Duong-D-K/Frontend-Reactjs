import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    }
    render() {
        let language = this.props.language;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img
                                alt=""
                                className="header-logo"
                                src={logo}
                                onClick={() => this.returnToHome()}
                            />
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
                {this.props.isShowBanner === true &&
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
                                    <div className="icon-child icon-child1"></div>
                                    <div className="text-child"><FormattedMessage id="content-down.child1"></FormattedMessage></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child icon-child2"></div>
                                    <div className="text-child"><FormattedMessage id="content-down.child2"></FormattedMessage></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child icon-child3"></div>
                                    <div className="text-child"><FormattedMessage id="content-down.child3"></FormattedMessage></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child icon-child4"></div>
                                    <div className="text-child"><FormattedMessage id="content-down.child4"></FormattedMessage></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child icon-child5"></div>
                                    <div className="text-child"><FormattedMessage id="content-down.child5"></FormattedMessage></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child icon-child6"></div>
                                    <div className="text-child"><FormattedMessage id="content-down.child6"></FormattedMessage></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child icon-child7"></div>
                                    <div className="text-child"><FormattedMessage id="content-down.child7"></FormattedMessage></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child icon-child8"></div>
                                    <div className="text-child"><FormattedMessage id="content-down.child8"></FormattedMessage></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child icon-child9"></div>
                                    <div className="text-child"><FormattedMessage id="content-down.child9"></FormattedMessage></div>
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
