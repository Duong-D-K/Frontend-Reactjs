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

class PatientManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seletedDate: new Date(),
        };
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            seletedDate: date[0],//hàm này nhả ra 1 arr, lấy phần tử đầu tiên của arr đó
        });
    };
    render() {

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
                        <div className="col-12">
                            <table id="PatientManagementTable">
                                <tbody>
                                    <tr>
                                        <th>abc</th>
                                        <th>abc</th>
                                        <th>abc</th>
                                        <th>abc</th>
                                        <th>abc</th>
                                    </tr>
                                    {/* {usersList && usersList.length > 0 && usersList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{language === LANGUAGES.VI ? item.genderData.valueVi : item.genderData.valueEn}</td>
                                    <td>{language === LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn}</td>
                                    <td>{language === LANGUAGES.VI ? item.roleData.valueVi : item.roleData.valueEn}</td>

                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => this.handleEditUser(item)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => this.handleDeleteUser(item)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        } */}
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
        // language: state.app.language,
        // doctorList: state.admin.allDoctors,
        // allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientManagement);
