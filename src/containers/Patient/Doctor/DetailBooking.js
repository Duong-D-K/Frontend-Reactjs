import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import "./DetailBooking.scss";
import { getDoctorByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import { FormattedMessage } from "react-intl";
import DoctorExtraInfo from "./DoctorExtraInfo";
import moment, { lang } from "moment/moment";

class DetailBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDoctorId: -1,
            doctor: {},
            schedule: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            this.setState({
                currentDoctorId: id,
            })
            // console.log("date", moment(parseInt(date)).format("dd, DD-MM-YYYY"));
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChange = () => {
        // console.log("abc");
    }
    render() {
        let { language, doctor, schedule } = this.props;

        console.log("doctor", doctor);
        console.log("schedule", schedule);


        let { currentDoctorId } = this.state;

        let scheduleTimeInfo = [];

        schedule.map((item, index) => {
            if (item.id === parseInt(currentDoctorId)) {
                scheduleTimeInfo = item;
            }
        })

        console.log("scheduleTimeInfo", scheduleTimeInfo);

        let nameEn = "", nameVi = "";

        if (doctor && doctor.positionData) {
            nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
            nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="booking-detail-container">
                    <div className="container">
                        <div className="doctor-intro">
                            <div
                                className="content-left mr-4"
                                style={{ backgroundImage: `url(${doctor && doctor.image ? doctor.image : ""})` }}>
                            </div>
                            <div className="content-right">
                                <div className="schedule-content">
                                    <span>ĐẶT LỊCH KHÁM</span>
                                </div>
                                <div className="doctor-name">
                                    <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                                </div>
                                <div className="schedule-time">
                                    <span>
                                        {scheduleTimeInfo.id}- {moment(parseInt(scheduleTimeInfo.date)).format("dd, DD-MM-YYYY")}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="container form-group col-8 check-schedule mt-5">
                            <form onChange={() => this.handleOnChange()}>
                                <input type="radio" id="html" name="fav_language" value="HTML" onChange={this.handleOnChange()} />
                                <label for="html" >Đặt cho mình</label>
                                <input type="radio" id="css" name="fav_language" value="CSS" onChange={this.handleOnChange()} />
                                <label for="css">Đặt cho người thân</label>
                            </form>
                        </div>
                        <div className="patient-name form-group col-8">
                            <div className="enter-info">
                                <i className="fa fa-user"></i>
                                <input className="form-control" type="text" placeholder="Họ tên bệnh nhân (bắt buộc)" />
                            </div>
                            <span className="">Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú</span>
                        </div>
                        <div className="check-gender form-group container col-8">
                            <form onChange={() => this.handleOnChange()}>
                                <input type="radio" id="html" name="fav_language" value="HTML" onChange={this.handleOnChange()} />
                                <label for="html" >Nam</label>
                                <input type="radio" id="css" name="fav_language" value="CSS" onChange={this.handleOnChange()} />
                                <label for="css">Nữ</label>
                                <input type="radio" id="css1" name="fav_language" value="CSS" onChange={this.handleOnChange()} />
                                <label for="css">Khác   </label>
                            </form>
                        </div>
                        <div className="patient-phonenumber form-group col-8">
                            <div className="enter-info">
                                <i className="fa fa-phone"></i>
                                <input className="form-control" type="tel" placeholder="Số điện thoại liên hệ (bắt buộc)" required />
                            </div>
                        </div>
                        <div className="patient-email form-group col-8">
                            <div className="enter-info">
                                <i className="fa fa-envelope"></i>
                                <input className="form-control" type="email" placeholder="Email (Bắt buộc)" />
                            </div>
                        </div>
                        <div className="patient-address form-group col-8">
                            <div className="enter-info">
                                <i className="fa fa-location-arrow"></i>
                                <input className="form-control" type="text" placeholder="Địa chỉ liên hệ (Bắt buộc)" />
                            </div>
                        </div>
                        <div className="patient-address form-group col-8">
                            <div className="enter-info">
                                <i className="fa fa-notes-medical fa-beat"></i>
                                <input className="form-control" type="text" placeholder="Lý do khám bệnh (Bắt buộc)" />
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
        language: state.app.language,
        doctor: state.admin.doctor,
        schedule: state.admin.schedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getDoctorByIdRedux: (id) => { dispatch(actions.getDoctorById(id)) },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBooking);
