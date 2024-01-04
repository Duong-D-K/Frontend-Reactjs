// import React, { Component } from "react";
// import { connect } from "react-redux";
// import HomeHeader from "../../HomePage/HomeHeader";
// import HomeFooter from "../../HomePage/HomeFooter";
// import * as actions from "../../../store/actions";
// import "./ExaminationVerification.scss";
// import { getDoctorByIdService } from "../../../services/userService";
// import { LANGUAGES } from "../../../utils";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import NumericFormat from "react-number-format";
// import moment, { lang } from "moment/moment";
// import _ from "lodash";
// import { FormattedMessage } from "react-intl";
// import queryString from 'query-string';

// class ExaminationVerification extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             examination_verification: {}
//         }
//     }

//     async componentDidMount() {
//         if (this.props.location?.search) {
//             let queryParams = queryString.parse(this.props.location.search);

//             this.props.saveExaminationVerificationRedux({
//                 token: queryParams.token,
//                 doctorId: queryParams.doctorId,
//                 patientId: queryParams.patientId,
//             });
//         }
//     }


//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (this.props.examination_verification !== prevProps.examination_verification) {
//             this.setState({
//                 examination_verification: this.props.examination_verification,
//             })
//         }
//     }

//     render() {
//         let { examination_verification } = this.state;

//         return (
//             <>
//                 <HomeHeader isShowBanner={false} />
//                 <div className="examinication-info-container">
//                     {examination_verification.code !== 0 ?
//                         <div className="examinication-info">
//                             {examination_verification.message}
//                         </div>
//                         :
//                         <div className="examinication-info">
//                             {examination_verification.message}
//                         </div>
//                     }            </div>
//                 <HomeFooter />
//             </>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         language: state.app.language,
//         examination_verification: state.admin.examination_verification,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         saveExaminationVerificationRedux: (data) => { dispatch(actions.saveExaminationVerification(data)) },
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ExaminationVerification);
