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
            isOpen: false,

            listSpecialty: [],
            selectedSpecialty: "",

            listClinic: [],
            selectedClinic: "",

            listGender: [],
            selectedGender: "",

            listPosition: [],
            selectedPosition: "",

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
        }
    }

    async componentDidMount() {
        await this.props.getAllSpecialtiesRedux();
        await this.props.getAllClinicsRedux();
        await this.props.getGenderRedux();
        await this.props.getPositonRedux();


        let doctor = this.props.currentDoctor;

        if (doctor && !_.isEmpty(doctor)) {
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
                    value: doctor.gender,
                },
                selectedPosition: {
                    label: this.props.language === LANGUAGES.VI ? doctor.positionData.valueVi : doctor.genderData.valueEn,
                    value: doctor.positionId,
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
                size="lg"
                centered
            >
                <ModalHeader toggle={toggleFromParent}>
                    Edit New User
                </ModalHeader>
                <ModalBody>
                    <div className="doctor-modal-body">
                        <div className="input-container col-4">
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "email"); }}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container col-3">
                            <label>First Name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName"); }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container col-2">
                            <label>Last Name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName"); }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container col-3">
                            <label>So dien thoai</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber"); }}
                                value={this.state.phoneNumber}>
                            </input>

                        </div>
                        <div className="input-container col-3">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "address"); }}
                                value={this.state.address}>
                            </input>
                        </div>

                        <div className="input-container col-3">
                            <label>Chuyen khoa</label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listSpecialty}
                                name="selectedSpecialty"
                            />
                        </div>
                        <div className="input-container col-7">
                            <label>Dia chi phong kham</label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listClinic}
                                name="selectedClinic"
                            />
                        </div>
                        <div className="input-container col-3">
                            <label>Chuc danh</label>
                            <Select
                                value={this.state.selectedPosition}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listPosition}
                                name="selectedPosition"
                            />
                        </div>
                        <div className="input-container col-2">
                            <label>Gioi tinh</label>
                            <Select
                                value={this.state.selectedGender}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listGender}
                                name="selectedGender"
                            />
                        </div>
                        <div className="col-2">
                            <label><FormattedMessage id="admin.manage-user.image" /></label>
                            <div className="preview-img-container">
                                <input type="file" id="previewImg" hidden
                                    onChange={(event) => { this.handleOnChangeImage(event) }}
                                />
                                <label className="label-upload" htmlFor="previewImg">Tải Ảnh<i className="fas fa-upload"></i></label>
                                <div className="prev-image"
                                    style={{ backgroundImage: `url(${this.state.avatar})` }}
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
                        onClick={() => { this.handleEditDoctor(); }}
                        className="px-3"
                    >
                        Save Change
                    </Button>
                    {""}
                    <Button
                        color="secondary" onClick={toggleFromParent}
                        className="px-3"
                    >
                        Close
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


    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpecialtiesRedux: () => dispatch(actions.getAllSpecialties()),
        getAllClinicsRedux: () => dispatch(actions.getAllClinics()),
        getPositonRedux: () => dispatch(actions.getPostion()),
        getGenderRedux: () => { dispatch(actions.getGender()) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDoctorModal);
