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
            allDoctors: [],
            clinic: [],
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            await this.props.getClinicByIdRedux(id);
            await this.props.getAllDoctorsByClinicIdRedux(id);
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.clinic !== prevProps.clinic) {
            this.setState({
                clinic: this.props.clinic,
            })
        }

        if (this.props.allDoctorsByClinicId !== prevProps.allDoctorsByClinicId) {
            this.setState({
                allDoctors: this.props.allDoctorsByClinicId
            })
        }
    }

    render() {
        let { allDoctors, clinic } = this.state;

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
                        {allDoctors?.length > 0 ? allDoctors.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="detail-content-left">
                                        <DoctorProfile
                                            dataFromParents={{
                                                key: "detail_clinic",
                                                time: "",
                                                doctor: item,
                                            }}
                                        />
                                    </div>
                                    <div className="detail-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule doctorFromParents={{
                                                key: "detail_clinic",
                                                data: item,
                                            }} />
                                        </div>
                                        <div className="doctor-extra-info">
                                            <DoctorExtraInfo doctorFromParents={item} />
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
        allDoctorsByClinicId: state.admin.allDoctorsByClinicId,
        clinic: state.admin.clinic,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClinicByIdRedux: (id) => { dispatch(actions.getClinicById(id)) },
        getAllDoctorsByClinicIdRedux: (id) => { dispatch(actions.getAllDoctorsByClinicId(id)) },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));
