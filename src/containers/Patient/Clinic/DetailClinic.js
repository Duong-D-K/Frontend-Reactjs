import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDoctorByIdService } from "../../../services/userService";
import "./DetailClinic.scss";
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
import _ from "lodash";
import { withRouter } from "react-router";


const mdParser = new MarkdownIt();
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorInfo: [],
            clinic: [],
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            await this.props.getClinicByIdRedux(id);
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.clinic !== prevProps.clinic) {
            this.setState({
                clinic: this.props.clinic,
                doctorInfo: this.props.clinic.doctor_info,
            })
        }

        if (prevProps.language !== this.props.language) {
            this.setState({
                doctorInfo: this.props.clinic.doctor_info,
            })

        }
    }

    render() {
        let { doctorInfo, clinic } = this.state;

        return (
            <>
                <div className="detail-specialty-container">
                    <HomeHeader />
                    <div className="detail-specialty-body m-5 px-5">
                        <div className="specialty-description">
                            <div className="specialty-name">
                                <h2>{clinic.name}</h2>
                            </div>
                            {clinic && !_.isEmpty(clinic) ?
                                <div dangerouslySetInnerHTML={{ __html: clinic.descriptionHTML }}>
                                </div>
                                : "Hiện tại chưa có phần giới thiệu cho chuyên khoa này!"
                            }
                        </div>
                        {doctorInfo?.length > 0 ? doctorInfo.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="detail-content-left">
                                        <DoctorProfile
                                            doctorId={item.doctorId}
                                            image={item.extraInfo.users.image}
                                            doctorName={{
                                                firstName: item.extraInfo.users.firstName,
                                                lastName: item.extraInfo.users.lastName,
                                            }}
                                            doctorDescription={item.extraInfo.markdown.description}
                                            doctorPosition={item.extraInfo.users.positionData}
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
                        }) : "Hiện tại chưa có bác sĩ nào trong cơ sở khám bệnh này!"}
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
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
        clinic: state.admin.clinic,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClinicByIdRedux: (id) => { dispatch(actions.getClinicById(id)) },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));
