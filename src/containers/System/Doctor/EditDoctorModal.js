import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { emitter } from "../../utils/emitter";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from "../../../utils";
import Select from 'react-select';
import { FormattedMessage } from "react-intl";
import Lightbox from 'react-image-lightbox';


class EditDoctorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            avatar: "",


            // previewImgUrl: [],
            // isOpen: false,

            listSpecialty: [],
            selectedSpecialty: "",

            listClinic: [],
            selectedClinic: "",

            listGender: [],
            selectedGender: "",

            listPosition: [],
            selectedPosition: "",

            listPrice: [],
            selectedPrice: "",

            listPayment: [],
            selectedPayment: "",

        };
    }
    buildDataSelect = (data, name) => {
        if (name === "specialty") {
            return data.map(item => ({
                label: this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn,
                value: item.id,
            }));
        } else if (name === "clinic") {
            return data.map(item => ({
                label: item.name,
                value: item.id,
            }));
        } else if (name === "gender") {
            return data.map(item => ({
                label: this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn,
                value: item.keyMap,
            }));
        } else if (name === "position") {
            return data.map(item => ({
                label: this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn,
                value: item.keyMap,
            }));
        } else if (name === "price") {
            return data.map(item => ({
                label: this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn,
                value: item.keyMap,
            }));
        } else if (name === "payment") {
            return data.map(item => ({
                label: this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn,
                value: item.keyMap,
            }));
        }
    }

    async componentDidMount() {
        await this.props.getAllSpecialtiesRedux();
        await this.props.getAllClinicsRedux();
        await this.props.getAllGendersRedux();
        await this.props.getAllPositonsRedux();
        await this.props.getAllPricesRedux();
        await this.props.getAllPaymentsRedux();


        let doctor = this.props.currentDoctor;

        if (doctor && !_.isEmpty(doctor)) {
            console.log("doctor", new Buffer(doctor.image, "base64").toString("binary"))
            this.setState({
                id: doctor.id,
                email: doctor.email,
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                address: doctor.address,
                phoneNumber: doctor.phoneNumber,
                selectedSpecialty: {
                    label: this.props.language === LANGUAGES.VI ? doctor.Specialty.nameVi : doctor.Specialty.nameEn,
                    value: doctor.Specialty.id,
                },
                selectedClinic: {
                    label: doctor.Clinic.name,
                    value: doctor.Clinic.id,
                },
                selectedGender: {
                    label: this.props.language === LANGUAGES.VI ? doctor.genderData.valueVi : doctor.genderData.valueEn,
                    value: doctor.genderData.keyMap,
                },
                selectedPosition: {
                    label: this.props.language === LANGUAGES.VI ? doctor.positionData.valueVi : doctor.positionData.valueEn,
                    value: doctor.positionData.keyMap,
                },
                selectedPrice: {
                    label: this.props.language === LANGUAGES.VI ? doctor.priceData.valueVi : doctor.priceData.valueEn,
                    value: doctor.priceData.keyMap,
                },
                selectedPayment: {
                    label: this.props.language === LANGUAGES.VI ? doctor.paymentData.valueVi : doctor.paymentData.valueEn,
                    value: doctor.paymentData.keyMap,
                },
                avatar: new Buffer(doctor.image, "base64").toString("binary"),
            })
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allSpecialties !== prevProps.allSpecialties) {
            let dataSelect = this.buildDataSelect(this.props.allSpecialties, "specialty");

            this.setState({
                listSpecialty: dataSelect,
            });
        }

        if (this.props.allClinics !== prevProps.allClinics) {
            let dataSelect = this.buildDataSelect(this.props.allClinics, "clinic");

            this.setState({
                listClinic: dataSelect,
            })
        }

        if (this.props.allGenders !== prevProps.allGenders) {
            this.setState({
                listGender: this.buildDataSelect(this.props.allGenders, "gender")
            })
        }

        if (this.props.allPositions !== prevProps.allPositions) {
            this.setState({
                listPosition: this.buildDataSelect(this.props.allPositions, "position")
            })
        }

        if (this.props.allPrices !== prevProps.allPrices) {
            this.setState({
                listPrice: this.buildDataSelect(this.props.allPrices, "price")
            })
        }

        if (this.props.allPayments !== prevProps.allPayments) {
            this.setState({
                listPayment: this.buildDataSelect(this.props.allPayments, "payment")
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    };

    handleOnChangeSelect = (selectedOption, name) => {
        this.setState({
            [name.name]: selectedOption,
        })
    }

    checkValidateInput = () => {//check doctor nhập vào có thiếu chỗ nào không
        let isValid = true;

        let arrayInput = ['email', 'firstName', 'lastName', 'address'];

        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                isValid = false;

                alert("Missing Parameter: " + arrayInput[i]);

                break;
            }
        }
        return isValid;
    };

    handleEditDoctor = () => {
        if (this.checkValidateInput() === true) {

            this.props.editDoctor(this.state);//truyền hết state của thăng con cho thằng cha
        };
    };

    handleOnChangeImage = async (event) => {
        let file = event.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            let objectUrl = URL.createObjectURL(file);

            this.setState({
                // previewImgUrl: objectUrl,
                avatar: base64,
            });
        }
    };

    render() {
        let { toggleFromParent } = this.props;

        return (
            <Modal
                isOpen={this.props.isOpen}
                className="doctor-modal-container"
                size="xl"
                centered
            >
                <ModalHeader toggle={toggleFromParent}>
                    <FormattedMessage id="admin.doctor.edit-doctor-modal.title" />
                </ModalHeader>
                <ModalBody>
                    <div className="doctor-modal-body">
                        <div className="input-container col-4">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.email" /></label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "email"); }}
                                value={this.state.email}
                                disabled
                                style={{ height: "36px" }}
                            />
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.firstName" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName"); }}
                                value={this.state.firstName}
                                style={{ height: "36px" }}
                            />
                        </div>
                        <div className="input-container col-2">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.lastName" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName"); }}
                                value={this.state.lastName}
                                style={{ height: "36px" }}
                            />
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.phoneNumber" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber"); }}
                                value={this.state.phoneNumber}
                                style={{ height: "36px" }}
                            >
                            </input>

                        </div>
                        <div className="input-container col-6">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.address" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "address"); }}
                                value={this.state.address}
                                style={{ height: "36px" }}
                            >
                            </input>
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.specialty" /></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listSpecialty}
                                name="selectedSpecialty"
                            />
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.price" /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listPrice}
                                name="selectedPrice"
                            />
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.payment" /></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listPayment}
                                name="selectedPayment"
                            />
                        </div>
                        <div className="input-container col-9">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.clinic" /></label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listClinic}
                                name="selectedClinic"
                            />
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.position" /></label>
                            <Select
                                value={this.state.selectedPosition}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listPosition}
                                name="selectedPosition"
                            />
                        </div>
                        <div className="input-container col-2">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.gender" /></label>
                            <Select
                                value={this.state.selectedGender}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listGender}
                                name="selectedGender"
                            />
                        </div>
                        <div className="col-2">
                            <label><FormattedMessage id="admin.doctor.edit-doctor-modal.image" /></label>
                            <div className="preview-img-container">
                                <input type="file" id="previewImg" hidden
                                    onChange={(event) => { this.handleOnChangeImage(event) }}
                                />
                                <label className="label-upload" htmlFor="previewImg"><FormattedMessage id="admin.doctor.edit-doctor-modal.upload-image" /><i className="fas fa-upload"></i></label>
                                <div className="prev-image"
                                    style={{ backgroundImage: `url(${this.state.avatar})` }}
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleEditDoctor(); }}
                        className="px-3"
                    >
                        <FormattedMessage id="admin.doctor.edit-doctor-modal.save" />
                    </Button>
                    {""}
                    <Button
                        color="secondary" onClick={toggleFromParent}
                        className="px-3"
                    >
                        <FormattedMessage id="admin.doctor.edit-doctor-modal.close" />
                    </Button>
                </ModalFooter>
            </Modal >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allSpecialties: state.admin.allSpecialties,
        language: state.app.language,
        allClinics: state.admin.allClinics,
        allGenders: state.admin.genders,
        allPositions: state.admin.positions,
        allPrices: state.admin.prices,
        allPayments: state.admin.payments,


    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpecialtiesRedux: () => dispatch(actions.getAllSpecialties()),
        getAllClinicsRedux: () => dispatch(actions.getAllClinics()),
        getAllPositonsRedux: () => dispatch(actions.getAllPositions()),
        getAllGendersRedux: () => dispatch(actions.getAllGenders()),
        getAllPricesRedux: () => dispatch(actions.getAllPrices()),
        getAllPaymentsRedux: () => dispatch(actions.getAllPayments()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDoctorModal);
