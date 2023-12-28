import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import * as actions from "../../../store/actions";
import moment, { lang } from "moment/moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleByDateService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import BookingModal from "./BookingModal";
import { classNames } from "react-select/dist/index-ea9e225d.cjs.prod";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        }
    }

    getArrDays = language => {
        let allDays = [];

        for (let i = 0; i < 7; i++) {
            let object = {};

            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    object.label = `Hôm Nay - ${moment(new Date()).format("DD/MM")}`;
                } else {
                    object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
                }
            } else {
                if (i === 0) {
                    object.label = `Today - ${moment(new Date()).format("DD/MM")}`;
                } else {
                    object.label = moment(new Date()).add(i, "days").locale("en").format("ddd - DD/MM");
                }
            }

            object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

            allDays.push(object);
        }
        return allDays;
    }

    async componentDidMount() {
        let { language } = this.props;

        let allDays = this.getArrDays(language);

        this.setState({
            allDays: allDays,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                allDays: this.getArrDays(this.props.language),
            })
        }

        if (this.props.doctorIdFromParents !== prevProps.doctorIdFromParents) {
            let allDays = this.getArrDays(this.props.language);

            await this.props.getScheduleByDateRedux(this.props.doctorIdFromParents, allDays[0].value);
        }

        if (this.props.schedule !== prevProps.schedule) {
            this.setState({
                allAvailableTime: this.props.schedule ? this.props.schedule : [],
            })
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParents && this.props.doctorIdFromParents !== -1) {
            let doctorId = this.props.doctorIdFromParents;

            let date = event.target.value;

            await this.props.getScheduleByDateRedux(doctorId, date);
        }
    }


    handleViewDetailDoctor = (time) => {
        // if (this.props.history) {
        //     this.props.history.push(`/detail-booking/${item.id}`);
        // }
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false,
        })
    }
    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;

        let { language } = this.props;

        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <i className="fas fa-calendar-alt">
                                <span><FormattedMessage id="client.patient.detail-doctor.schedule" /></span>
                            </i>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className="time-content-btns">
                                        {
                                            allAvailableTime.map((item, index) => {
                                                let diplayTime = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                                return (
                                                    <button
                                                        key={index}
                                                        className={language === LANGUAGES.VI ? "btn-vi" : "btn-en"}
                                                        onClick={() => this.handleViewDetailDoctor(item)}
                                                    > {diplayTime}</button>
                                                );
                                            })
                                        }
                                    </div>
                                    <div className="book-free">
                                        <span>
                                            <FormattedMessage id="client.patient.detail-doctor.choose" />
                                            <i className="far fa-hand-point-up"></i>
                                            <FormattedMessage id="client.patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </>
                                :
                                <div className="no-schedule"><FormattedMessage id="client.patient.detail-doctor.no-schedule" /></div>
                            }
                        </div>
                    </div>
                </div >

                <BookingModal
                    openBookingModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                />
            </>
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
        getScheduleByDateRedux: (doctorId, date) => { dispatch(actions.getScheduleByDate(doctorId, date)) },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
