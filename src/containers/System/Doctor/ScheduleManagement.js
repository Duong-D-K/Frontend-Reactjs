import React, { Component } from "react";
import { connect } from "react-redux";
import "./ScheduleManagement.scss";
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";

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
        this.props.getAllDoctorsRedux();
        this.props.getAllScheduleTimeRedux();
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
            let data = this.props.allScheduleTime;

            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }));//thêm một thuộc tính mới cho từng phần tử
                //dấu ... sẽ copy hết phần tử của mảng lại và sau đó thêm thuộc tính isSelected vào mỗi phần tử
            }

            this.setState({
                period: data,
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


    handleClickBtnTime = time => {
        let { period } = this.state;

        if (period && period.length > 0) {
            period = period.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
        }

        this.setState({
            period: period,
        })

    }

    handleSaveSchedule = async () => {
        let { period, selectedDoctor, seletedDate } = this.state;

        let result = [];

        if (!seletedDate) {
            toast.error("Please Choose Date!");
            return;
        }
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Please Choose Doctor!");
            return;
        }

        // let formattedDate = moment(seletedDate).format(dateFormat.SEND_TO_SERVER);
        // let formattedDate = moment(seletedDate).unix();
        let formattedDate = new Date(seletedDate).getTime();

        if (period && period.length > 0) {
            let selectedTime = period.filter(item => item.isSelected === true);//cho hết tất cả những phần tử được chọn vào trong mảng selectedTime

            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {};

                    object.doctorId = selectedDoctor.value;//value và label
                    object.date = formattedDate;
                    object.timeType = item.keyMap;

                    result.push(object);
                })

            } else {
                toast.error("Please Choose Time!");
                return;
            }
        }

        let res = await this.props.createBulkScheduleRedux({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate,
        });
    }

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
                                        <button
                                            key={index}
                                            className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                                }
                            </div>
                            <div className="col-12">
                                <button
                                    className="btn btn-primary btn-save-schedule"
                                    onClick={() => { this.handleSaveSchedule() }}
                                >
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
        getAllDoctorsRedux: () => { dispatch(actions.fetchAllDoctors()) },
        getAllScheduleTimeRedux: () => { dispatch(actions.getAllScheduleTime()) },
        createBulkScheduleRedux: (data) => { dispatch(actions.createBulkSchedule(data)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManagement);
