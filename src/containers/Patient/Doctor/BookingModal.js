import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import "./BookingModal.scss";
import { getDoctorByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DoctorProfile from "./DoctorProfile";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { openBookingModal, closeBookingModal, dataTime, schedule, doctor } = this.props;


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
                            <span className="left">Info</span>
                            <span
                                className="right"
                                onClick={closeBookingModal}

                            ><i className="fas fa-times"></i></span>

                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-info">
                                <DoctorProfile />
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <label>Ho ten</label>
                                        <input className="form-control" />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>so dien thoai</label>
                                        <input className="form-control" />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>email</label>
                                        <input className="form-control" />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>dia chi lien he</label>
                                        <input className="form-control" />
                                    </div>
                                    <div className="col-12 form-group">
                                        <label>ly do kham</label>
                                        <input className="form-control" />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>dat cho ai</label>
                                        <input className="form-control" />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>gioi tinh</label>
                                        <input className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className="btn-booking-confirm">xac nhan</button>
                            <button className="btn-booking-cancel"
                                onClick={closeBookingModal}
                            >huy bo</button>

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
        schedule: state.admin.schedule,
        doctor: state.admin.doctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
