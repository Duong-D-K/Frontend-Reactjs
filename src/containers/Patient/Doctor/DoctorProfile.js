import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import "./DoctorProfile.scss";
import { getDoctorByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NumericFormat from "react-number-format";

class DoctorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},

        }
    }

    async componentDidMount() {
        this.setState({
            profile: this.props.doctor,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctor !== prevProps.doctor) {
            this.setState({
                profile: this.props.doctor,
            })
        }
    }

    render() {
        let { language } = this.props;
        let { profile } = this.state;

        console.log(this.state);

        let nameEn = "", nameVi = "";

        if (profile && profile.positionData) {
            nameVi = `${profile.positionData.valueVi}, ${profile.lastName} ${profile.firstName}`;
            nameEn = `${profile.positionData.valueEn}, ${profile.firstName} ${profile.lastName}`;
        }
        return (
            <>
                <div className="doctor-profile-container">
                    <div className="doctor-intro">
                        <div
                            className="content-left"
                            style={{ backgroundImage: `url(${profile && profile.image ? profile.image : ""})` }}>
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {profile && profile.Markdown && profile.Markdown.description ?
                                    <span>
                                        {profile.Markdown.description}
                                    </span>

                                    : ""
                                }
                            </div>
                            <div className="price">
                                <span>
                                    Giá khám:
                                    {profile && profile.Doctor_Information && profile.Doctor_Information.priceData ?
                                        <NumericFormat
                                            className="currency"
                                            value={language === LANGUAGES.VI ?
                                                "Giá Khám: " + profile.Doctor_Information.priceData.valueVi
                                                :
                                                "Price: " + profile.Doctor_Information.priceData.valueEn
                                            }
                                            displayType="text"
                                            thousandSeparator={true}
                                            suffix={language === LANGUAGES.VI ? " VND" : " USD"}
                                        /> : "Hiện tại chưa có giá khám bệnh"
                                    }
                                </span>
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
        schedule: state.admin.schedule,
        doctor: state.admin.doctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
