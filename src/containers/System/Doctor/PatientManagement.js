import React, { Component } from "react";
import { connect } from "react-redux";
import "./PatientManagement.scss";
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import moment, { lang } from "moment/moment";
import PrescriptionModal from "./PrescriptionModal";

class PatientManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            allPatients: {},
            isOpenPrescriptionModal: false,
            dataModal: {},
        };
    }

    async componentDidMount() {
        await this.props.getAllPatientsByDateAndDoctorIdRedux(
            this.props.user.id,
            this.state.selectedDate.setHours(0, 0, 0, 0)
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allPatients !== prevProps.allPatients) {
            this.setState({
                allPatients: this.props.allPatients,
            })
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            selectedDate: date[0],//hàm này nhả ra 1 arr, lấy phần tử đầu tiên của arr đó
        }, async () => {
            await this.props.getAllPatientsByDateAndDoctorIdRedux(
                this.props.user.id,
                new Date(this.state.selectedDate).getTime()
            );
        });
    };

    handleConfirm = (item) => {
        this.setState({
            isOpenPrescriptionModal: true,
            dataModal: {
                doctorId: item.doctorId,
                patientId: item.patientId,
                email: item.Patient.email,
                timeType: item.appointmentTime,
                name: item.Patient.fullName,
            },
        })
    }

    closePrescriptionModal = () => {
        this.setState({
            isOpenPrescriptionModal: false,
            dataModal: {},
        })
    }

    sendPrescription = async sendPrescription => {
        let { dataModal } = this.state;

        await this.props.sendPrescriptionRedux({
            email: dataModal.email,
            doctorId: dataModal.doctorId,
            image: sendPrescription.image,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.name,
        });

        this.closePrescriptionModal();

        await this.props.getAllPatientsByDateAndDoctorIdRedux(
            this.props.user.id,
            new Date(this.state.selectedDate).getTime()
        );
    }

    render() {
        let { allPatients, isOpenPrescriptionModal, dataModal } = this.state;

        let { language } = this.props;

        return (
            <>
                <div className="patient-management-container">
                    <div className="patient-management-title">
                        Quan Ly Benh Nhan Kham Benh
                    </div>
                    <div className="patient-management-body row mx-5">
                        <div className="col-6 form-group">
                            <label>Chon ngay kham</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.selectedDate}
                            />
                        </div>
                        <div className="col-12 patient-management-table">
                            <table id="PatientManagementTable">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ho va Ten</th>
                                        <th>Gioi tinh</th>
                                        <th>Ngay sinh</th>
                                        <th>Ngay kham benh</th>
                                        <th>Gio kham benh</th>
                                        <th>action</th>
                                    </tr>
                                    {allPatients && allPatients.length > 0 ? allPatients.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.Patient.fullName || ""}</td>
                                                <td>{language === LANGUAGES.VI ? item.Patient.Allcode.valueVi : item.Patient.Allcode.valueEn}</td>
                                                <td>{language === LANGUAGES.VI ?
                                                    moment(parseInt(item.Patient.birthday)).format("DD/MM/YYYY")
                                                    :
                                                    moment(parseInt(item.Patient.birthday)).locale("en").format("YYYY/MM/DD")
                                                }</td>
                                                <td>{language === LANGUAGES.VI ?
                                                    moment(parseInt(item.appointmentDate)).format("DD/MM/YYYY")
                                                    :
                                                    moment(parseInt(item.appointmentDate)).locale("en").format("YYYY/MM/DD")}</td>
                                                <td>{language === LANGUAGES.VI ?
                                                    item.Allcode.valueVi : item.Allcode.valueEn}
                                                </td>
                                                <td>
                                                    <button
                                                        className="mp-btn-confirm"
                                                        onClick={() => this.handleConfirm(item)}
                                                    >
                                                        Xac nhan
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                        :
                                        <tr>
                                            <td colSpan={7} style={{ textAlign: "center" }}>Hien tai chua co benh nhan dat lich kham</td>

                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <PrescriptionModal
                    isOpenModal={isOpenPrescriptionModal}
                    dataModal={dataModal}
                    closePrescriptionModal={this.closePrescriptionModal}
                    sendPrescription={this.sendPrescription}
                />
            </>
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
        getAllPatientsByDateAndDoctorIdRedux: (doctorId, date) => { dispatch(actions.getAllPatientsByDateAndDoctorId(doctorId, date)) },
        sendPrescriptionRedux: (data) => { dispatch(actions.sendPrescription(data)) },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientManagement);
