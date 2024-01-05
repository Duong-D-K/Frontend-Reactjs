import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import "./DoctorProfile.scss";
import { getDoctorByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NumericFormat from "react-number-format";
import moment, { lang } from "moment/moment";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { Link, withRouter } from 'react-router-dom';

class DoctorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
        }
    }

    async componentDidMount() {
        this.setState({
            profile: this.props.doctor,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctor !== prevProps.doctor) {
            this.setState({
                profile: this.props.doctor,
            })
        }
    }

    render() {
        let { doctorId, image, doctorName, doctorPosition, doctorDescription, language, dataTime } = this.props;

        let { profile } = this.state;

        let nameEn = "", nameVi = "";

        if (doctorPosition) {
            nameVi = `${doctorPosition.valueVi}, ${doctorName.lastName} ${doctorName.firstName}`;
            nameEn = `${doctorPosition.valueEn}, ${doctorName.firstName} ${doctorName.lastName}`;
        }

        return (
            <>
                <div className="doctor-profile-container">
                    <div className="doctor-intro">
                        <div
                            className="content-left"
                            style={{ backgroundImage: `url(${image ? image : ""})` }}>
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {this.props.isShowDescriptionDoctor === true ?
                                    <>
                                        <span>
                                            {doctorDescription ? doctorDescription : "Hiện tại chưa có thông tin!"}
                                        </span>
                                    </>
                                    :
                                    <>
                                        {dataTime && !_.isEmpty(dataTime) ?
                                            <div className="date">
                                                {language === LANGUAGES.VI ?
                                                    `${dataTime.timeTypeData.valueVi} - ${moment(parseInt(dataTime.date)).format("dddd, DD-MM-YYYY")}`
                                                    : `${dataTime.timeTypeData.valueEn} - ${moment(parseInt(dataTime.date)).locale("en").format("ddd, YYYY-MM-DD")}`
                                                }
                                            </div>
                                            : <></>
                                        }
                                        <div>
                                            <FormattedMessage id={"client.doctor-profile.free-appointment"} />
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="price">
                                <span>
                                    {this.props.isShowDescriptionDoctor === false ?
                                        (profile && profile.Doctor_Information && profile.Doctor_Information.priceData ?
                                            (<>
                                                <FormattedMessage id={"client.doctor-profile.price"} />
                                                <NumericFormat
                                                    className="currency"
                                                    value={language === LANGUAGES.VI ?
                                                        profile.Doctor_Information.priceData.valueVi
                                                        :
                                                        profile.Doctor_Information.priceData.valueEn
                                                    }
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={language === LANGUAGES.VI ? " VND" : " USD"}
                                                />
                                            </>)
                                            : ("Hiện tại chưa có giá khám bệnh"))
                                        : (<>
                                            <div className="view-detail-doctor">
                                                <Link to={`/detail-doctor/${this.props.doctorId}`}>Xem them</Link>
                                            </div>
                                        </>)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        schedule: state.admin.schedule,
        doctor: state.admin.doctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorProfile));
