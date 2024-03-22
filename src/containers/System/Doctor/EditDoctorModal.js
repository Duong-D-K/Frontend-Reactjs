import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { emitter } from "../../utils/emitter";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from "../../../utils";
import Select from 'react-select';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from "react-intl";
import Lightbox from 'react-image-lightbox';
import MarkdownIt from 'markdown-it';

const mdParser = new MarkdownIt();

class EditDoctorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: "",

            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            image: "",
            contentHTML: "",
            contentMarkdown: "",
            introduction: "",
            note: "",

            listProvince: [],
            selectedProvince: "",

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
        } else if (name === "province") {
            return data.map(item => ({
                label: this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn,
                value: item.id
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
        await this.props.getAllProvinceRedux();



        let doctor = this.props.currentDoctor;

        if (doctor.key === "edit") {
            this.setState({
                actions: doctor.key,
                id: doctor.data.id,
                email: doctor.data.email,
                password: "hashcode",
                firstName: doctor.data.firstName,
                lastName: doctor.data.lastName,
                selectedProvince: {
                    label: this.props.language === LANGUAGES.VI ? doctor.data.Province.nameVi : doctor.data.Province.nameEn,
                    value: doctor.data.Province.id,
                },
                phoneNumber: doctor.data.phoneNumber,
                contentHTML: doctor.data.contentHTML,
                contentMarkdown: doctor.data.contentMarkdown,
                introduction: doctor.data.introduction,
                note: doctor.data.note,
                selectedSpecialty: {
                    label: this.props.language === LANGUAGES.VI ? doctor.data.Specialty.nameVi : doctor.data.Specialty.nameEn,
                    value: doctor.data.Specialty.id,
                },
                selectedClinic: {
                    label: doctor.data.Clinic.name,
                    value: doctor.data.Clinic.id,
                },
                selectedGender: {
                    label: this.props.language === LANGUAGES.VI ? doctor.data.genderData.valueVi : doctor.data.genderData.valueEn,
                    value: doctor.data.genderData.keyMap,
                },
                selectedPosition: {
                    label: this.props.language === LANGUAGES.VI ? doctor.data.positionData.valueVi : doctor.data.positionData.valueEn,
                    value: doctor.data.positionData.keyMap,
                },
                selectedPrice: {
                    label: this.props.language === LANGUAGES.VI ? doctor.data.priceData.valueVi : doctor.data.priceData.valueEn,
                    value: doctor.data.priceData.keyMap,
                },
                selectedPayment: {
                    label: this.props.language === LANGUAGES.VI ? doctor.data.paymentData.valueVi : doctor.data.paymentData.valueEn,
                    value: doctor.data.paymentData.keyMap,
                },
                image: new Buffer(doctor.data.image, "base64").toString("binary"),
            })
        } else if (doctor.key === "create") {
            this.setState({
                actions: doctor.key,
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
                listGender: this.buildDataSelect(this.props.allGenders, "gender"),
            })
        }

        if (this.props.allPositions !== prevProps.allPositions) {
            this.setState({
                listPosition: this.buildDataSelect(this.props.allPositions, "position"),
            })
        }

        if (this.props.allPrices !== prevProps.allPrices) {
            this.setState({
                listPrice: this.buildDataSelect(this.props.allPrices, "price"),
            })
        }

        if (this.props.allPayments !== prevProps.allPayments) {
            this.setState({
                listPayment: this.buildDataSelect(this.props.allPayments, "payment"),
            })
        }

        if (this.props.allProvinces !== prevProps.allProvinces) {
            this.setState({
                listProvince: this.buildDataSelect(this.props.allProvinces, "province"),
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

        let arrayInput = ['email', 'firstName', 'lastName', 'selectedProvince'];

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
                image: base64,
            });
        }
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

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
                    {this.props.currentDoctor.key === "edit" ?
                        <FormattedMessage id="admin.doctor.edit-doctor-modal.edit-title" />
                        :
                        <FormattedMessage id="admin.doctor.edit-doctor-modal.create-title" />
                    }
                </ModalHeader>
                <ModalBody>
                    <div className="doctor-modal-body container-fluid">
                        <div className="row col-12">
                            <div className="input-container col-2 form-group">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.email" /></label>
                                <input
                                    type='text'
                                    onChange={(event) => { this.handleOnChangeInput(event, "email"); }}
                                    value={this.state.email}
                                    disabled={this.props.currentDoctor.key === "edit"}
                                    style={{ height: "36px" }}
                                />
                            </div>
                            <div className="input-container col-2 form-group">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.firstName" /></label>
                                <input
                                    type="text"
                                    onChange={(event) => { this.handleOnChangeInput(event, "firstName"); }}
                                    value={this.state.firstName}
                                    style={{ height: "36px" }}
                                />
                            </div>
                            <div className="input-container col-1 form-group">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.lastName" /></label>
                                <input
                                    type="text"
                                    onChange={(event) => { this.handleOnChangeInput(event, "lastName"); }}
                                    value={this.state.lastName}
                                    style={{ height: "36px" }}
                                />
                            </div>
                            <div className="input-container col-2 form-group">
                                <label><FormattedMessage id="admin.doctor.create-doctor-modal.password" /></label>
                                <input
                                    type="password"
                                    onChange={(event) => { this.handleOnChangeInput(event, "password"); }}
                                    value={this.state.password}
                                    style={{ height: "36px" }}
                                    disabled={this.props.currentDoctor.key === "edit"}
                                />
                            </div>
                            <div className="input-container col-1">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.listGender}
                                    name="selectedGender"
                                />
                            </div>
                            <div className="input-container col-2 form-group">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.address" /></label>
                                <Select
                                    value={this.state.selectedProvince}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.listProvince}
                                    name="selectedProvince"
                                />
                                {/* <input
                                    type="text"
                                    onChange={(event) => { this.handleOnChangeInput(event, "address"); }}
                                    value={this.state.address}
                                    style={{ height: "36px" }}
                                >
                                </input> */}
                            </div>
                            <div className="input-container col-2 form-group">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.specialty" /></label>
                                <Select
                                    value={this.state.selectedSpecialty}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.listSpecialty}
                                    name="selectedSpecialty"
                                />
                            </div>
                        </div>
                        <div className="row col-10">
                            <div className="input-container col-2 form-group">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.price" /></label>
                                <Select
                                    value={this.state.selectedPrice}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.listPrice}
                                    name="selectedPrice"
                                />
                            </div>
                            <div className="input-container col-2 form-group">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.payment" /></label>
                                <Select
                                    value={this.state.selectedPayment}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.listPayment}
                                    name="selectedPayment"
                                />
                            </div>
                            <div className="input-container col-4 form-group">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.clinic" /></label>
                                <Select
                                    value={this.state.selectedClinic}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.listClinic}
                                    name="selectedClinic"
                                />
                            </div>
                            <div className="input-container col-2 form-group">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.position" /></label>
                                <Select
                                    value={this.state.selectedPosition}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.listPosition}
                                    name="selectedPosition"
                                />
                            </div>

                            <div className="input-container col-2 form-group">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.phoneNumber" /></label>
                                <input
                                    type="text"
                                    onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber"); }}
                                    value={this.state.phoneNumber}
                                    style={{ height: "36px" }}
                                >
                                </input>
                            </div>
                            <div className="input-container col-8 form-group">
                                <label>
                                    <FormattedMessage id="admin.doctor.doctor-introduction.intro" />
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="6"
                                    onChange={(event) => this.handleOnChangeInput(event, "introduction")}
                                    value={this.state.introduction}
                                >
                                </textarea>
                            </div>
                            <div className="input-container col-4 form-group">
                                <label><FormattedMessage id="admin.doctor.doctor-introduction.note" /></label>
                                <textarea
                                    className="form-control"
                                    rows="6"
                                    onChange={(event) => this.handleOnChangeInput(event, "note")}
                                    value={this.state.note}
                                >
                                </textarea>
                            </div>
                        </div>
                        <div className="row col-2">
                            <div className="container-fluid">
                                <label><FormattedMessage id="admin.doctor.edit-doctor-modal.image" /></label>
                                <div className="preview-img-container">
                                    <input type="file" id="previewImg" hidden
                                        onChange={(event) => { this.handleOnChangeImage(event) }}
                                    />
                                    <label className="label-upload" htmlFor="previewImg"><FormattedMessage id="admin.doctor.edit-doctor-modal.upload-image" /><i className="fas fa-upload"></i></label>
                                    <div className="prev-image"
                                        style={{ backgroundImage: `url(${this.state.image})` }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-introduction-editor row col-12">
                            <div className="container-fluid">
                                <MdEditor
                                    style={{ height: '400px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.contentMarkdown}
                                />
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
                        {this.props.currentDoctor.key === "create" ?
                            <FormattedMessage id="admin.doctor.edit-doctor-modal.save" />
                            :
                            <FormattedMessage id="admin.doctor.edit-doctor-modal.confirm-edit" />
                        }
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
        allProvinces: state.admin.allProvinces,
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
        getAllProvinceRedux: () => { dispatch(actions.getAllProvinces()) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDoctorModal);
