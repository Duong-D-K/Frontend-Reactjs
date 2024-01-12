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

class PatientManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seletedDate: new Date(),
            allPatients: {},
        };
    }
    async componentDidMount() {
        await this.props.getAllPatientsByDateAndDoctorIdRedux(
            this.props.user.id,
            this.state.seletedDate.setHours(0, 0, 0, 0)
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
            seletedDate: date[0],//hàm này nhả ra 1 arr, lấy phần tử đầu tiên của arr đó
        }, async () => {
            await this.props.getAllPatientsByDateAndDoctorIdRedux(
                this.props.user.id,
                new Date(this.state.seletedDate).getTime()
            );
        });
    };

    handleConfirm = () => {

    }

    handleRemedy = () => {

    }

    render() {
        let { allPatients } = this.state;

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
                                value={this.state.seletedDate}
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
                                                <td>{item.Patient.fullName}</td>
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
                                                        onClick={() => this.handleConfirm()}
                                                    >
                                                        Xac nhan
                                                    </button>
                                                    <button
                                                        className="mp-btn-remedy"
                                                        onClick={() => this.handleRemedy()}>
                                                        Gui hoa don
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                        : <>Hien tai chua co benh nhan dat lich kham</>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientManagement);
