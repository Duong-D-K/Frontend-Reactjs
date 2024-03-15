import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import "./BookingModal.scss";
import { getDoctorByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DoctorProfile from "./DoctorProfile";
import DatePicker from "../../../components/Input/DatePicker";
import Select from 'react-select';
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import moment, { lang } from "moment/moment";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            selectedGender: "",
            doctorId: "",
            timeType: "",

            listGenders: "",

            image: "",
            doctorName: "",
            doctorPosition: "",
            doctorIntro: "",
        }
    }

    async componentDidMount() {
        this.props.getGenderRedux();
    }

    buildDataGender = (data) => {
        return data.map(item => ({
            label: this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn,
            value: item.keyMap,
        }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                listGenders: this.buildDataGender(this.props.listGenders)
            })
        }

        if (this.props.listGenders !== prevProps.listGenders) {
            this.setState({
                listGenders: this.buildDataGender(this.props.listGenders)
            })
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            this.setState({
                doctorId: this.props.dataTime.doctorId,
                timeType: this.props.dataTime.timeType,
            })
        }
        if (this.props.doctor !== prevProps.doctor) {
            console.log(this.props.doctor.Markdown.description);

            this.setState({
                doctorName: { firstName: this.props.doctor.firstName, lastName: this.props.doctor.lastName },
                image: this.props.doctor.image,
                doctorPosition: this.props.doctor.positionData,
                doctorDescription: this.props.doctor.Markdown.description,
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy,
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],//hàm này nhả ra 1 arr, lấy phần tử đầu tiên của arr đó
        });
    };

    handleChange = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = () => {
        this.props.saveAppointmentBookingRedux({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            birthday: new Date(this.state.birthday).getTime(),
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            appointmentTime: this.props.dataTime.timeType,
            language: this.props.language,
            appointmentDate: this.props.dataTime.date,
            timeString: this.props.language === LANGUAGES.VI ?
                `${this.props.dataTime.timeTypeData.valueVi} - ${moment(parseInt(this.props.dataTime.date)).format("dddd, DD-MM-YYYY")}`
                : `${this.props.dataTime.timeTypeData.valueEn} - ${moment(parseInt(this.props.dataTime.date)).locale("en").format("ddd, YYYY-MM-DD")}`,
            doctorString: this.props.language === LANGUAGES.VI ?
                `${this.props.doctor.positionData.valueVi}, ${this.props.doctor.lastName} ${this.props.doctor.firstName}` :
                `${this.props.doctor.positionData.valueEn}, ${this.props.doctor.firstName} ${this.props.doctor.lastName}`,
        });

        this.props.closeBookingModal();
    }

    render() {
        let { openBookingModal, closeBookingModal, dataTime } = this.props;

        let { image, doctorName, doctorPosition, doctorDescription } = this.state;

        return (
            <>
                <Modal
                    isOpen={openBookingModal}
                    className="booking-modal-container"
                    size="lg"
                    centered
                    backdrop={true}
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">
                                <FormattedMessage id={"client.booking-modal.title"} />
                            </span>
                            <span
                                className="right"
                                onClick={closeBookingModal}

                            ><i className="fas fa-times"></i></span>

                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-info">
                                <DoctorProfile
                                    doctorId={""}
                                    image={image}
                                    doctorName={doctorName}
                                    doctorDescription={doctorDescription}
                                    doctorPosition={doctorPosition}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                />
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id={"client.booking-modal.patient-fullName"} />
                                        </label>
                                        <input
                                            className="form-control"
                                            value={this.state.fullName}
                                            onChange={(event) => { this.handleOnChangeInput(event, "fullName") }}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id={"client.booking-modal.phoneNumber"} />
                                        </label>
                                        <input
                                            className="form-control"
                                            value={this.state.phoneNumber}
                                            onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber") }}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id={"client.booking-modal.email"} />
                                        </label>
                                        <input
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id={"client.booking-modal.address"} />
                                        </label>
                                        <input
                                            className="form-control"
                                            value={this.state.address}
                                            onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                        />
                                    </div>
                                    <div className="col-12 form-group">
                                        <label>
                                            <FormattedMessage id={"client.booking-modal.reason"} />
                                        </label>
                                        <input
                                            className="form-control"
                                            value={this.state.reason}
                                            onChange={(event) => { this.handleOnChangeInput(event, "reason") }}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id={"client.booking-modal.birthday"} />
                                        </label>
                                        <DatePicker
                                            className="form-control"
                                            onChange={this.handleOnChangeDatePicker}
                                            value={this.state.birthday}
                                            maxdate={new Date(new Date().setHours(23, 59, 59, 999))}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>
                                            <FormattedMessage id={"client.booking-modal.gender"} />
                                        </label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChange}
                                            options={this.state.listGenders}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button
                                className="btn-booking-confirm"
                                onClick={() => this.handleConfirmBooking()}
                            >
                                <FormattedMessage id={"client.booking-modal.btn-confirm"} />
                            </button>
                            <button
                                className="btn-booking-cancel"
                                onClick={closeBookingModal}
                            >
                                <FormattedMessage id={"client.booking-modal.btn-cancel"} />
                            </button>

                        </div>
                    </div>
                </Modal>


            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        // schedule: state.admin.schedule,
        doctor: state.admin.doctor,
        listGenders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderRedux: () => { dispatch(actions.getAllGenders()) },
        saveAppointmentBookingRedux: (data) => { dispatch(actions.saveAppointmentBooking(data)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
