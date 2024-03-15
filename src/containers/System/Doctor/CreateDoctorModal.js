import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from "../../../utils";
import Select from 'react-select';

class CreateDoctorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            image: "",
            phoneNumber: "",

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
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            //reset state
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
                image: "",
                selectedSpecialty: "",
                selectedClinic: "",
                selectedGender: "",
                selectedPosition: "",
            })
        });
    }//bust event 

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

    handleOnChangeInput = (event, id) => {//lay tat ca thong tin doctor nhap vao roi luu vao state
        //bad code. modify state
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => { console.log("check bad code: " + this.state) })

        //good code
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
    };

    handleOnChangeImage = async (event) => {
        let file = event.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            let objectUrl = URL.createObjectURL(file);

            this.setState({
                // previewImgUrl: objectUrl,
                image: base64,
            });
        }
    }

    checkValidateInput = () => {
        let isValid = true;

        let arrayInput = ['email', 'password', 'firstName', 'lastName', 'address'];

        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                isValid = false;

                alert("Missing Parameter: " + arrayInput[i]);

                break;
            }
        }
        return isValid;
    };

    handleCreateNewDoctor = () => {
        if (this.checkValidateInput() === true) {
            //call api
            this.props.createNewDoctor(this.state);//truyền hết state của thăng con cho thằng cha
        };
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                className={"doctor-modal-container"}
                size="xl"
                centered
            >
                <ModalHeader toggle={() => { this.props.toggleFromParent(); }}>
                    <FormattedMessage id="admin.doctor.create-doctor-modal.title" />
                </ModalHeader>
                <ModalBody>
                    <div className="doctor-modal-body">
                        <div className="input-container col-4">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.email" /></label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "email"); }}
                                value={this.state.email}
                                required
                            />
                        </div>

                        <div className="input-container col-4">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.password" /></label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, "password"); }}
                                value={this.state.password} />

                        </div>
                        <div className="input-container col-4">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.firstName" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName"); }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container col-4">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.lastName" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName"); }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container col-4">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.address" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "address"); }}
                                value={this.state.address} />
                        </div>
                        <div className="input-container col-4">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.phoneNumber" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber"); }}
                                value={this.state.phoneNumber} />
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.gender" /></label>
                            <Select
                                value={this.state.selectedGender}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listGender}
                                name="selectedGender"
                            />
                        </div>
                        <div className="input-container col-9">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.clinic" /></label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listClinic}
                                name="selectedClinic"
                            />
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.specialty" /></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listSpecialty}
                                name="selectedSpecialty"
                            />
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.position" /></label>
                            <Select
                                value={this.state.selectedPosition}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listPosition}
                                name="selectedPosition"
                            />
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.price" /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listPrice}
                                name="selectedPrice"
                            />
                        </div>
                        <div className="input-container col-3">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.payment" /></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listPayment}
                                name="selectedPayment"
                            />
                        </div>
                        <div className="col-2">
                            <label><FormattedMessage id="admin.doctor.create-doctor-modal.image" /></label>
                            <div className="preview-img-container">
                                <input type="file" id="previewImg" hidden
                                    onChange={(event) => { this.handleOnChangeImage(event) }}
                                />
                                <label className="label-upload" htmlFor="previewImg"><FormattedMessage id="admin.doctor.create-doctor-modal.upload-image" /><i className="fas fa-upload"></i></label>
                                <div className="prev-image"
                                    style={{ backgroundImage: `url(${this.state.image})` }}
                                    onClick={() => {
                                        this.setState({ isOpen: true });
                                    }}
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleCreateNewDoctor(); }}
                        className="px-3"
                    >
                        <FormattedMessage id="admin.doctor.create-doctor-modal.add-new" />
                    </Button>
                    {""}
                    <Button
                        color="secondary" onClick={() => { this.props.toggleFromParent(); }}
                        className="px-3"
                    >
                        <FormattedMessage id="admin.doctor.create-doctor-modal.close" />
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDoctorModal);
