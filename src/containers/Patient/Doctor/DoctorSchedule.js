import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import * as actions from "../../../store/actions";
import moment, { lang } from "moment/moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleByDateService } from "../../../services/userService";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            schedule: [],
        }
    }


    setArrDays = language => {
        let allDays = [];

        for (let i = 0; i < 7; i++) {
            let object = {};

            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, "days").format("dddd-DD/MM");
            } else {
                object.label = moment(new Date()).add(i, "days").locale("en").format("ddd-DD/MM");
            }

            object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

            allDays.push(object);
        }


        // this.props.getScheduleByDateRedux(65, 1694707200000);
        this.setState({
            allDays: allDays,
        })
    }

    componentDidMount() {
        let { language } = this.props;

        this.setArrDays(language);


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.schedule !== prevProps.schedule) {
            this.setState({
                schedule: this.props.schedule,
            })
        }
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language);
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParents && this.props.doctorIdFromParents !== -1) {
            let doctorId = this.props.doctorIdFromParents;

            let date = event.target.value;

            let response = await getScheduleByDateService(doctorId, date);

            console.log(response);
        }
    }
    render() {
        let { allDays } = this.state;

        return (
            <>
                <div className="doctor schedule-container">
                    <div className="all-schedule">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="all-available-time">

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        schedule: state.admin.schedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getScheduleByDateRedux: (doctorId, date) => { dispatch(actions.getScheduleByDate(doctorId, date)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
