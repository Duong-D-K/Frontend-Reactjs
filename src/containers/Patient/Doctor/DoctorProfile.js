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
            // profile: {},

            image: "",
        }
    }

    async componentDidMount() {

        // this.setState({
        //     profile: this.props.doctor,
        // })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        // if (this.props.doctor !== prevProps.doctor) {
        //     this.setState({
        //         profile: this.props.doctor,
        //     })
        // }

        // if (this.props.data !== prevProps.data) {
        //     console.log("ahihi");
        //     this.setState({
        //         image: this.props.image,
        //     })
        // }
    }

    render() {
        let doctor = this.props.dataFromParents.doctor || "";
        let time = this.props.dataFromParents.time || "";
        let key = this.props.dataFromParents.key || "";

        let nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
        let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;

        return (
            <>
                <div className="doctor-profile-container">
                    <div className="doctor-intro">
                        <div
                            className="content-left"
                            style={{ backgroundImage: `url(${doctor.image ? doctor.image : ""})` }}>
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {this.props.language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {time && !_.isEmpty(time) ?
                                    <div className="date">
                                        {this.props.language === LANGUAGES.VI ?
                                            `${time.timeTypeData.valueVi} - ${moment(parseInt(time.date)).format("dddd, DD-MM-YYYY")}`
                                            : `${time.timeTypeData.valueEn} - ${moment(parseInt(time.date)).locale("en").format("ddd, YYYY-MM-DD")}`
                                        }
                                    </div>
                                    :
                                    <>
                                        <span>
                                            {doctor.introduction ? doctor.introduction : "Hiện tại chưa có thông tin!"}
                                        </span>
                                    </>
                                }
                                <div>
                                    <FormattedMessage id={"client.doctor-profile.free-appointment"} />
                                </div>
                            </div>
                            <div className="price">
                                <span>
                                    {key === "doctor_schedule" ?
                                        (doctor && doctor.priceData ?
                                            (<>
                                                <FormattedMessage id={"client.doctor-profile.price"} />
                                                <NumericFormat
                                                    className="currency"
                                                    value={this.props.language === LANGUAGES.VI ?
                                                        doctor.priceData.valueVi
                                                        :
                                                        doctor.priceData.valueEn
                                                    }
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={this.props.language === LANGUAGES.VI ? " VND" : " USD"}
                                                />
                                            </>)
                                            : ("Hiện tại chưa có giá khám bệnh"))
                                        : key === "detail_specialty" || "detail_clinic" ?
                                            (<>
                                                <div className="view-detail-doctor">
                                                    <Link to={`/detail-doctor/${doctor.id}`}>Xem them</Link>
                                                </div>
                                            </>) :
                                            <></>
                                    }
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
        // doctor: state.admin.doctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorProfile));
