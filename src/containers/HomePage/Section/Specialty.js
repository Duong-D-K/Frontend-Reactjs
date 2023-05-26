import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialtyImg from "../../../assets/images/specialty/co-xuong-khop.jpg";

class Specialty extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section-specialty">
                <div className="specialty-container">
                    <div className="specialty-header">
                        <span className="title-section">Chuyên Khoa Phổ Biến</span>
                        <button className="btn-section">Xem Thêm</button>
                    </div>
                    <div className="specialty-body">
                        <Slider {...settings}>
                            <div className="specialty-customize">
                                <div className="bg-image"></div>
                                <div className="specialty-customize-text">Cơ Xương Khớp 1</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-image"></div>
                                <div className="specialty-customize-text">Cơ Xương Khớp 2</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-image"></div>
                                <div className="specialty-customize-text">Cơ Xương Khớp 3</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-image"></div>
                                <div className="specialty-customize-text">Cơ Xương Khớp 4</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-image"></div>
                                <div className="specialty-customize-text">Cơ Xương Khớp 5</div>
                            </div>
                            <div className="specialty-customize">
                                <div className="bg-image"></div>
                                <div className="specialty-customize-text">Cơ Xương Khớp 6</div>
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
