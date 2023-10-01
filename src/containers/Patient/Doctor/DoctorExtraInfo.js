import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false,
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    showDoctorInfo = (status) => {
        this.setState({
            showInfo: status
        })
    }

    render() {
        let { showInfo } = this.state;

        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="clinic-name">Phòng khám Chuyên khoa Da Liễu</div>
                    <div className="detail-address">207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <div className="content-down">
                    {showInfo === false ?
                        <div className="short-info">Giá Khám 250000.
                            <span onClick={() => this.showDoctorInfo(true)}> Xem Chi tiet</span>
                        </div>
                        :
                        <>
                            <div className="title-price">Giá Khám: </div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left">Giá khám </span>
                                    <span className="right">400.000đ</span>
                                </div>
                                <div className="note">
                                    Giá khám đã bao gồm phí đặt lịch hẹn trước (Giá niêm yết của phòng khám)
                                    Giá khám cho người nước ngoài 30 USD
                                </div>
                            </div>

                            <div className="payment">
                                Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
                            <div className="hide-price">
                                <span onClick={() => this.showDoctorInfo(false)}>Ẩn bảng giá</span>
                            </div>
                        </>
                    }


                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        schedule: state.admin.schedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
