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
import _ from "lodash";

const mdParser = new MarkdownIt();
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyInfo: [],
            doctorInfo: [],
            listProvince: [],
            selectedProvince: "",
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            await this.props.getAllDoctorInSpecialtyRedux({ id: id, location: "ALL" });
            await this.props.getAllRequiredDoctorInfoRedux();
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allDoctorsInSpecialty !== prevProps.allDoctorsInSpecialty) {
            this.setState({
                doctorInfo: this.props.allDoctorsInSpecialty.updatedDoctors,
                specialtyInfo: this.props.allDoctorsInSpecialty.specialty,
            })
        }

        if (prevProps.language !== this.props.language) {
            let { responseProvince } = this.props.allRequiredDoctorInfo;

            this.setState({
                listProvince: this.buildDataInputSelect(this.props.allRequiredDoctorInfo.responseProvince),
            })
        }

        if (this.props.allRequiredDoctorInfo !== prevProps.allRequiredDoctorInfo) {
            this.setState({
                listProvince: this.buildDataInputSelect(this.props.allRequiredDoctorInfo.responseProvince),
            })
        }
    }

    buildDataInputSelect = (inputData, type) =>
        (inputData?.length > 0)
            ? inputData.map(item => ({
                label: this.props.language === LANGUAGES.VI ? (type === "USERS" ? `${item.lastName} ${item.firstName}` : item.valueVi) : (type === "USERS" ? `${item.firstName} ${item.lastName}` : item.valueEn),
                value: type === "USERS" ? item.id : item.keyMap,
            }))
            : [];

    handleOnChangeSelect = async (selectedOption, name) => {
        this.setState({
            [name.name]: selectedOption,
        })

        await this.props.getAllDoctorInSpecialtyRedux({ id: this.props.allDoctorsInSpecialty.specialty.id, location: selectedOption.value });
    }

    render() {
        let { doctorInfo, specialtyInfo, listProvince } = this.state;

        return (
            <>
                <div className="detail-specialty-container">
                    <HomeHeader />
                    <div className="detail-specialty-body m-5 px-5">
                        <div className="specialty-description">
                            {specialtyInfo && !_.isEmpty(specialtyInfo) ?
                                <div dangerouslySetInnerHTML={{ __html: specialtyInfo.contentHTML }}>
                                </div>
                                : "Hiện tại chưa có phần giới thiệu cho chuyên khoa này!"
                            }
                        </div>
                        <div className="find-doctor-by-location">
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                name="selectedProvince"
                            />
                        </div>
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
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorInSpecialtyRedux: (id) => { dispatch(actions.getAllDoctorInSpecialty(id)) },
        getAllRequiredDoctorInfoRedux: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
