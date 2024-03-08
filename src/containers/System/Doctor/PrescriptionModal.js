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
            // backdrop={true}
            >
                <div className="modal-header">
                    <h5 className="modal-title">Gui hoa don kham benh</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closePrescriptionModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Email benh nhan</label>
                            <input
                                className="form-control" type="email"
                                defaultValue={dataModal.email}
                                onChange={event => this.onChangeEmail(event)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chon File hoa don</label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={event => this.handleOnChangeImage(event)} />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSendPrescription}>gui di</Button>
                    <Button color="secondary" onClick={closePrescriptionModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            // <>
            //     <Button color="danger" onClick={this.toggle}></Button>
            //     <Modal
            //         isOpen={isOpenModal}
            //         toggle={this.toggle}
            //         className={this.props.className}
            //     >
            //         <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            //         <ModalBody>
            //             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            //         </ModalBody>
            //         <ModalFooter>
            //             <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            //             <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            //         </ModalFooter>
            //     </Modal></>
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
