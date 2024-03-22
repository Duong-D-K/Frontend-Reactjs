import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import "./DetailDoctor.scss";
import { getDoctorByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import DoctorProfile from "./DoctorProfile";
import _ from "lodash";

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            await this.props.getDoctorByIdRedux(this.props.match.params.id);
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
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="detail-doctor container-fluid">
                    {/* <div className="doctor-intro"> */}
                    {this.state.detailDoctor && !_.isEmpty(this.state.detailDoctor) ?
                        <DoctorProfile
                            dataFromParents={{
                                key: "detail-doctor",
                                doctor: this.state.detailDoctor
                            }}
                        /> : <>{`hien tai chua co thong tin`}</>
                    }
                    {/* </div> */}


                    <div className="doctor-schedule">
                        <div className="content-left">
                            {this.state.detailDoctor && !_.isEmpty(this.state.detailDoctor) ?
                                <DoctorSchedule
                                    doctorFromParents={{
                                        key: "detail-doctor",
                                        data: this.state.detailDoctor,
                                    }}
                                />
                                : <></>
                            }

                        </div>
                        {this.state.detailDoctor && !_.isEmpty(this.state.detailDoctor) ?
                            <div className="content-right">
                                <DoctorExtraInfo
                                    doctorFromParents={this.state.detailDoctor}
                                />
                            </div>
                            : <></>
                        }

                    </div>
                    <div className="doctor-detail-info">
                        {this.state.detailDoctor && this.state.detailDoctor.contentHTML ?
                            <div dangerouslySetInnerHTML={{ __html: this.state.detailDoctor.contentHTML }}>
                            </div>
                            : `Hiện tại chưa có phần giới thiệu cho bác sĩ này`
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
