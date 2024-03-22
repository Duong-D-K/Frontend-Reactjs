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
import { withRouter } from "react-router";


const mdParser = new MarkdownIt();
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);

        this.memoizedValueRef = React.createRef();

        this.state = {
            currentSpecialty: [],
            listDoctor: [],

            listProvince: [],
            selectedProvince: "",
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            await this.props.getClinicByIdRedux(id);

            await this.props.getAllDoctorBySpecialtyIdRedux({ id: id, location: "ALL" });

            // await this.props.getAllRequiredDoctorInfoRedux();

            await this.props.getAllProvinceRedux();

        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.specialty !== prevProps.specialty) {
            this.setState({
                currentSpecialty: this.props.specialty,
            })
        }

        if (this.props.allDoctorsBySpecialtyId !== prevProps.allDoctorsBySpecialtyId) {
            this.setState({
                listDoctor: this.props.allDoctorsBySpecialtyId,
                // currentSpecialty: this.props.allDoctorsInSpecialty.specialty,
            })
        }

        if (this.props.listProvinces !== prevProps.listProvinces) {
            this.setState({
                listProvince: this.buildDataReactSelect(this.props.listProvinces),
            })
        }
        if (prevProps.language !== this.props.language) {
            this.setState({
                listProvince: this.buildDataReactSelect(this.props.listProvinces),
            })
        }
    }

    buildDataReactSelect = (inputData) => {
        let result = (inputData?.length > 0)
            ? inputData.map(item => ({
                label: this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn,
                value: item.id,
            }))
            : [];

        result.unshift({
            label: this.props.language === LANGUAGES.VI ? "Toàn Quốc" : "Nationwide",
            value: "ALL",
        });

        return result;
    }

    handleOnChangeSelect = async (selectedOption, name) => {
        this.setState({
            [name.name]: selectedOption,
        })

        await this.props.getAllDoctorBySpecialtyIdRedux({ id: this.props.match.params.id, location: selectedOption.value });
    }

    render() {
        let { listDoctor, currentSpecialty, listProvince } = this.state;

        return (
            <>
                <div className="detail-specialty-container">
                    <HomeHeader />
                    <div className="detail-specialty-body m-5 px-5">
                        <div className="specialty-description">
                            <div className="specialty-name">
                                <h2>{this.props.language === LANGUAGES.VI ? currentSpecialty.nameVi : currentSpecialty.nameEn}</h2>
                            </div>
                            {currentSpecialty && !_.isEmpty(currentSpecialty) ?
                                <div dangerouslySetInnerHTML={{ __html: currentSpecialty.contentHTML }}>
                                </div>
                                : "Hiện tại chưa có phần giới thiệu cho chuyên khoa này!"
                            }
                        </div>

                        <div className="find-doctor-by-location">
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleOnChangeSelect}
                                options={this.state.listProvince}
                                placeholder={`chon tinh thanh`}
                                name="selectedProvince"
                            />
                        </div>

                        {listDoctor?.length > 0 ? listDoctor.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="detail-content-left">
                                        <DoctorProfile
                                            dataFromParents={{
                                                key: "detail_specialty",
                                                time: "",
                                                doctor: item,
                                            }}
                                        />
                                    </div>
                                    <div className="detail-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorFromParents={{
                                                    key: "detail_specialty",
                                                    data: item,
                                                }} />
                                        </div>
                                        <div className="doctor-extra-info">
                                            <DoctorExtraInfo doctorFromParents={item} />
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : "Xin Lỗi! Không Có Bác Sĩ Nào Phù Hợp!"}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        specialty: state.admin.specialty,
        allDoctorsBySpecialtyId: state.admin.allDoctorsBySpecialtyId,

        listProvinces: state.admin.allProvinces,


        // allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClinicByIdRedux: (id) => dispatch(actions.getSpecialtyById(id)),

        getAllDoctorBySpecialtyIdRedux: (id) => { dispatch(actions.getAllDoctorsBySpecialtyId(id)) },

        getAllProvinceRedux: () => { dispatch(actions.getAllProvinces()) },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
