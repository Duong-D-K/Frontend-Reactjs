import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import "./DoctorManagement.scss";
import { createDoctorService } from "../../../services/userService";
import { emitter } from "../../../utils/emitter";
import CreateDoctorModal from "./CreateDoctorModal";
import EditDoctorModal from "./EditDoctorModal";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { useTable } from 'react-table';
import { toast } from "react-toastify";

class DoctorManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            isOpenCreateModalUser: false,
            isOpenEditModalDoctor: false,
            doctorEdit: {},
        };
    }

    async componentDidMount() {
        await this.props.getAllDoctorsRedux();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {

            this.setState({
                allDoctors: this.props.allDoctors,
            })
        }
    }

    toggleUserCreateModal = () => {
        this.setState({
            isOpenCreateModalUser: !this.state.isOpenCreateModalUser,
        });
    };

    toggleDoctorEditModal = () => {
        this.setState({
            isOpenEditModalDoctor: !this.state.isOpenEditModalDoctor,
        })
    }

    createNewDoctor = async (data) => {
        try {
            let response = await createDoctorService({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.selectedGender.value,
                position: data.selectedPosition.value,
                clinic: data.selectedClinic.value,
                specialty: data.selectedSpecialty.value,
                price: data.selectedPrice.value,
                payment: data.selectedPayment.value,
                image: data.image,
            })

            if (response && response.code !== 0) {
                toast.error(response.message);
            } else {
                await this.props.getAllDoctorsRedux();

                toast.success(response.message);

                this.setState({
                    isOpenCreateModalUser: false,
                });

                emitter.emit("EVENT_CLEAR_MODAL_DATA");//clear modal 
            }
        } catch (e) {
            console.log(e);
        }
    }

    deleteDoctor = async (doctor) => {
        try {
            await this.props.deleteDoctorRedux(doctor.id);
        } catch (e) {
            console.log(e);
        }
    }

    editDoctor = async (doctor) => {
        try {
            this.props.updateDoctorRedux({
                id: doctor.id,
                email: doctor.email,
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                address: doctor.address,
                phoneNumber: doctor.phoneNumber,
                gender: doctor.selectedGender.value,
                position: doctor.selectedPosition.value,
                specialty: doctor.selectedSpecialty.value,
                clinic: doctor.selectedClinic.value,
                avatar: doctor.avatar,
                price: doctor.selectedPrice.value,
                payment: doctor.selectedPayment.value,
            });

            this.setState({ isOpenEditModalDoctor: false });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let { allDoctors } = this.state;

        return (
            <div className="doctor-container container-fluid">
                <CreateDoctorModal
                    isOpen={this.state.isOpenCreateModalUser}
                    toggleFromParent={this.toggleUserCreateModal}
                    createNewDoctor={this.createNewDoctor}
                />
                {this.state.isOpenEditModalDoctor &&
                    <EditDoctorModal
                        isOpen={this.state.isOpenEditModalDoctor}
                        toggleFromParent={this.toggleDoctorEditModal}
                        currentDoctor={this.state.doctorEdit}
                        editDoctor={this.editDoctor}
                    />
                }
                <div className="title text-center">
                    <FormattedMessage id="admin.doctor.doctor-management.title" />
                </div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.setState({ isOpenCreateModalUser: true })}
                    >
                        <i className="fas fa-plus"></i><FormattedMessage id="admin.doctor.doctor-management.add-new" />
                    </button>
                </div>
                <div className="user-table mt-4 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th><FormattedMessage id="admin.doctor.doctor-management.ordinal" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.email" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.firstName" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.lastName" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.phoneNumber" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.address" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.gender" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.specialty" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.clinic" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.position" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.price" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.payment" /></th>
                                <th><FormattedMessage id="admin.doctor.doctor-management.action" /></th>
                            </tr>
                            {allDoctors ? allDoctors.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>{this.props.language === LANGUAGES.VI ? item.genderData.valueVi : item.genderData.valueEn}</td>
                                        <td>{this.props.language === LANGUAGES.VI ? item.Specialty.nameVi : item.Specialty.nameEn}</td>
                                        <td>{item.Clinic.name}</td>
                                        <td>{this.props.language === LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn}</td>
                                        <td>{this.props.language === LANGUAGES.VI ? `${item.priceData.valueVi} VND` : `${item.priceData.valueEn} USD`}</td>
                                        <td>{this.props.language === LANGUAGES.VI ? item.paymentData.valueVi : item.paymentData.valueEn}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => {
                                                    this.setState({
                                                        isOpenEditModalDoctor: true,
                                                        doctorEdit: item,

                                                    })
                                                }}><FormattedMessage id="admin.doctor.doctor-management.edit" />
                                            </button>
                                            <button className="btn-delete" onClick={() => this.deleteDoctor(item)}><FormattedMessage id="admin.doctor.doctor-management.delete" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }) : <></>}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorsRedux: () => { dispatch(actions.getAllDoctors()) },
        updateDoctorRedux: (data) => { dispatch(actions.updateDoctor(data)) },
        deleteDoctorRedux: (doctorId) => { dispatch(actions.deleteDoctor(doctorId)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManagement);
