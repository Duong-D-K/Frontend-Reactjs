import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import "./DetailDoctor.scss";
import { getDoctorByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            await this.props.getDoctorByIdRedux(id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctor !== prevProps.doctor) {
            this.setState({
                detailDoctor: this.props.doctor,
            });
        }
    }

    render() {
        let { detailDoctor } = this.state;

        let { language } = this.props;

        let nameEn = "", nameVi = "";

        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="doctor-intro">
                        <div
                            className="content-left"
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ""})` }}>
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>}
                            </div>
                        </div>
                    </div>
                    <div className="doctor-schedule">
                        <div className="content-left">
                            <DoctorSchedule
                                doctorIdFromParents={detailDoctor && detailDoctor.id ? detailDoctor.id : -1} />
                        </div>
                        <div className="content-right">

                        </div>
                    </div>
                    <div className="doctor-detail-info">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>
                    <div className="doctor-comment">

                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctor: state.admin.doctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorByIdRedux: (id) => { dispatch(actions.getDoctorById(id)) },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
