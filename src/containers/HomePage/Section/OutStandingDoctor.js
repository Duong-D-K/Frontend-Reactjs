import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayDoctors: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrayDoctors: this.props.topDoctorsRedux,
            })
        }
    }

    componentDidMount() {
        this.props.getTopDoctorsRedux();
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    }

    render() {
        let arrayDoctors = this.state.arrayDoctors;

        let { language } = this.props;
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.prominent-doctor" /></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrayDoctors && arrayDoctors.length > 0 && arrayDoctors.map((item, index) => {
                                let imageBase64 = "";

                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, "base64").toString("binary");
                                }

                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className="section-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className="customize-border">
                                            <div className="outer-bg">
                                                <div className="bg-image section-outstanding-doctor"
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                />
                                            </div>
                                            <div className="postion text-center">
                                                <div className="section-customize-text">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div className="">Cơ Xương Khớp</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTopDoctorsRedux: () => dispatch(actions.getTopDoctors()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
