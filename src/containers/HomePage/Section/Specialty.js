import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
// import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class Specialty extends Component {
    render() {
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Chuyên Khoa Phổ Biến</span>
                        <button className="btn-section">Xem Thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-specialty "></div>
                                <div className="section-customize-text">Cơ Xương Khớp 1</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-specialty "></div>
                                <div className="section-customize-text">Cơ Xương Khớp 2</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-specialty "></div>
                                <div className="section-customize-text">Cơ Xương Khớp 3</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-specialty "></div>
                                <div className="section-customize-text">Cơ Xương Khớp 4</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-specialty "></div>
                                <div className="section-customize-text">Cơ Xương Khớp 5</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-specialty "></div>
                                <div className="section-customize-text">Cơ Xương Khớp 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
