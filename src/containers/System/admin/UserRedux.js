import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodesSerivce } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";

class UserRedux extends Component {
    constructor(prpos) {
        super(prpos);
        this.state = {
            genderArray: {}
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let response = await getAllCodesSerivce("gender");

        //     if (response && response.errCode === 0) {
        //         this.setState({
        //             genderArray: response.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArray: this.props.genderRedux
            })
        }
    }
    render() {
        let genders = this.state.genderArray;
        let language = this.props.language;
        return (
            <div className="user-redux-cotainer">
                <div className="title">
                    <div className="text-center">User Redux Duong Duy Khanh</div>
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-3">
                                <label>Email</label>
                                <input className="form-control" type="emaiL" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="password" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.firstName" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.lastName" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phoneNumber" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control">
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => { dispatch(actions.fetchGenderStart()) }
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
