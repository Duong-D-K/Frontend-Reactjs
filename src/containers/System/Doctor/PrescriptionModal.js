import React, { Component } from "react";
import { connect } from "react-redux";
import "./PrescriptionModal.scss";
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import moment, { lang } from "moment/moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";

class PrescriptionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            image: "",
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                image: base64,
            });
        }
    }

    handleSendPrescription = () => {
        this.props.sendPrescription(this.state);
    }

    render() {
        let { isOpenModal, dataModal, closePrescriptionModal } = this.props;

        return (
            <Modal
                isOpen={isOpenModal}
                className="booking-modal-container"
                size="lg"
                centered
            //  toggle={closePrescriptionModal} # khi bấm vào bên ngoài của Modal thì sẽ tự động thoát ra khỏi Modal, tuy nhiên thì nhỡ bấm nhầm thì sẽ phải mở lại
            >
                <ModalHeader toggle={closePrescriptionModal}><FormattedMessage id="admin.doctor.prescription-modal.title" /></ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="admin.doctor.prescription-modal.patient-email" /></label>
                            <input
                                className="form-control" type="email"
                                defaultValue={dataModal.email}
                                onChange={event => this.onChangeEmail(event)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="admin.doctor.prescription-modal.select-file" /></label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={event => this.handleOnChangeImage(event)} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSendPrescription}><FormattedMessage id="admin.doctor.prescription-modal.send" /></Button>{' '}
                    <Button color="secondary" onClick={closePrescriptionModal}><FormattedMessage id="admin.doctor.prescription-modal.cancel" /></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfo,
        allPatients: state.admin.allPatients,
        // doctorList: state.admin.allDoctors,
        // allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);
