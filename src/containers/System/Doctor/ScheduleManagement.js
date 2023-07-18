import React, { Component } from "react";
import { connect } from "react-redux";
import "./ScheduleManagement.scss";
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";

class ScheduleManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: "",

            seletedDate: "",
            period: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllScheduleTime();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorList !== this.props.doctorList) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorList);

            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                period: this.props.allScheduleTime
            });
        }
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor: selectedDoctor });

    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            seletedDate: date[0],//hàm này nhả ra 1 arr, lấy phần tử đầu tiên của arr đó
        });
    };

    render() {
        let { period } = this.state;

        let { language } = this.props;

        return (
            <>
                <div className="schedule-management-container">
                    <div className="m-s-title">
                        <FormattedMessage id="schedule-management.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="schedule-management.select-doctor" />
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="schedule-management.select-date" />
                                </label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.seletedDate}
                                    minDate={new Date()}

                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {period && period.length > 0 && period.map((item, index) => {
                                    return (
                                        <button key={index} className="btn btn-schedule">
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                                }
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary btn-save-schedule">
                                    <FormattedMessage id="schedule-management.save-info" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctorList: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => { dispatch(actions.fetchAllDoctors()) },
        getAllScheduleTime: () => { dispatch(actions.getAllScheduleTime()) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManagement);
