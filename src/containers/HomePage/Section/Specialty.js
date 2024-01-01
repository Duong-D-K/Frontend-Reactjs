import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
// import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { LANGUAGES } from "../../../utils";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSpecialties: [],
        }
    }
    async componentDidMount() {
        await this.props.getAllSpecialtiesRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allSpecialties !== prevProps.allSpecialties) {
            this.setState({
                allSpecialties: this.props.allSpecialties,
            })
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`);
        }
    }

    render() {
        let { allSpecialties } = this.state;

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="client.homepage.popular-specialty" /></span>
                        <button className="btn-section"><FormattedMessage id="client.homepage.more-info" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {allSpecialties?.length > 0 ? allSpecialties.map((item, index) => {
                                return (
                                    <div
                                        className="section-customize" key={index}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
                                    >
                                        <div className="customize-border">
                                            <div className="outer-bg">
                                                <div className="bg-image section-specialty"
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                            </div>
                                            <div className="postion text-center">
                                                <div className="section-customize-text">{this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <><div>Server Error</div></>}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allSpecialties: state.admin.allSpecialties,


    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpecialtiesRedux: () => dispatch(actions.getAllSpecialties()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
