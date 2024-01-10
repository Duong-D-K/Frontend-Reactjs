import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
// import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allClinics: [],
        }
    }

    componentDidMount() {
        this.props.getAllClinicsRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allClinics !== prevProps.allClinics) {
            this.setState({
                allClinics: this.props.allClinics,
            })
        }
    }

    handleViewDetailClinic = item => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    }
    render() {
        let { allClinics } = this.state;

        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ Sở Y Tế Nổi Bật</span>
                        <button className="btn-section">Xem Thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {allClinics?.length > 0 ? allClinics.map((item, index) => {
                                return (
                                    <div
                                        className="section-customize" key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div className="customize-border">
                                            <div className="outer-bg">
                                                <div className="bg-image section-medical-facility"
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                            </div>
                                            <div className="postion text-center">
                                                <div className="section-customize-text">{item.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <><div>Server Error</div></>}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        allClinics: state.admin.allClinics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClinicsRedux: () => dispatch(actions.getAllClinics()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
