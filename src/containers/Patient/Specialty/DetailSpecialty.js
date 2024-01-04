import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDoctorByIdService } from "../../../services/userService";
import "./DetailSpecialty.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import DoctorProfile from "../Doctor/DoctorProfile";

const mdParser = new MarkdownIt();
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorInfo: [],

        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            await this.props.getAllDoctorInSpecialtyRedux(id);
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allDoctorsInSpecialty !== prevProps.allDoctorsInSpecialty) {
            this.setState({
                doctorInfo: this.props.allDoctorsInSpecialty,
            })
        }
    }

    render() {
        let { doctorInfo } = this.state;

        return (
            <>
                <div className="detail-specialty-container">
                    <HomeHeader />
                    <div className="detail-specialty-body m-5 px-5">
                        <div className="specialty-description">
                        </div>
                        <div>Hell world form detail spcialty</div>
                        {doctorInfo?.length > 0 ? doctorInfo.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="detail-content-left">
                                        <DoctorProfile
                                            image={item.User.image}
                                            doctorName={{
                                                firstName: item.User.firstName,
                                                lastName: item.User.lastName,
                                            }}
                                            doctorDescription={item.Markdown.description}
                                            doctorPosition={item.User.positionData}
                                            isShowDescriptionDoctor={true}
                                            dataTime={""}
                                        />
                                    </div>
                                    <div className="detail-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule doctorIdFromParents={item.doctorId} />
                                        </div>
                                        <div className="doctor-extra-info">
                                            <DoctorExtraInfo doctorIdFromParents={item.doctorId} />
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : "Hiện tại chưa có bác sĩ nào trong chuyên khoa này!"}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctorsInSpecialty: state.admin.allDoctorsInSpecialty,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorInSpecialtyRedux: (id) => { dispatch(actions.getAllDoctorInSpecialty(id)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
