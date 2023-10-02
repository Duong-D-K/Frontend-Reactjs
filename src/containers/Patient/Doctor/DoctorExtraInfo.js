import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss"
import { getDoctorInformationById } from "../../../services/userService";
import NumericFormat from "react-number-format";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false,

            doctorInfo: {},
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParents !== prevProps.doctorIdFromParents) {
            let response = await getDoctorInformationById(this.props.doctorIdFromParents);

            if (response && response.code === 0) {
                this.setState({
                    doctorInfo: response.data,
                });
            }
        }
    }

    showDoctorInfo = (status) => {
        this.setState({
            showInfo: status
        })
    }

    render() {
        let { showInfo, doctorInfo } = this.state;

        let { language } = this.props;
        console.log("check", doctorInfo);

        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="client.extra-info-doctor.examination-address" />
                    </div>
                    <div className="clinic-name">
                        {doctorInfo && doctorInfo.clinicName ? doctorInfo.clinicName : ""}
                    </div>
                    <div className="detail-address">
                        {doctorInfo && doctorInfo.clinicAddress ? doctorInfo.clinicAddress : ""}
                    </div>
                </div>
                <div className="content-down">
                    {showInfo === false ?
                        <div className="short-info">
                            <FormattedMessage id="client.extra-info-doctor.examination-price" />

                            {doctorInfo && doctorInfo.priceData &&
                                <NumericFormat
                                    className="currency"
                                    value={language === LANGUAGES.VI ? doctorInfo.priceData.valueVi : doctorInfo.priceData.valueEn}
                                    displayType="text"
                                    thousandSeparator={true}
                                    suffix={language === LANGUAGES.VI ? "VND" : "USD"}
                                />
                            }
                            <span className="detail" onClick={() => this.showDoctorInfo(true)}>
                                <FormattedMessage id="client.extra-info-doctor.see-details" />

                            </span>
                        </div>
                        :
                        <>
                            <div className="title-price">
                                <FormattedMessage id="client.extra-info-doctor.examination-price" />
                            </div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="client.extra-info-doctor.examination-price" />
                                    </span>
                                    <span className="right">
                                        {doctorInfo && doctorInfo.priceData &&
                                            <NumericFormat
                                                className="currency"
                                                value={language === LANGUAGES.VI ? doctorInfo.priceData.valueVi : doctorInfo.priceData.valueEn}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={language === LANGUAGES.VI ? "VND" : "USD"}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className="note">
                                    {doctorInfo && doctorInfo.note ? doctorInfo.note : ""}
                                </div>
                            </div>

                            <div className="payment">
                                <FormattedMessage id="client.extra-info-doctor.payment" />
                                {doctorInfo && doctorInfo.paymentData &&
                                    language === LANGUAGES.VI ? doctorInfo.paymentData.valueVi : doctorInfo.paymentData.valueEn}
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showDoctorInfo(false)}>
                                    <FormattedMessage id="client.extra-info-doctor.hide-price" />

                                </span>
                            </div>
                        </>
                    }


                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        schedule: state.admin.schedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
