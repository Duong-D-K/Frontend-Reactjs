import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
    constructor(prpos) {
        super(prpos);
        this.state = {
            genderArray: [],
            positonArray: [],
            roleArray: [],
            previewImgUrl: [],
            isOpen: false,

            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositonStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArray: this.props.genderRedux,
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].key : ""
            })
        }
        if (prevProps.postionRedux !== this.props.postionRedux) {
            this.setState({
                positonArray: this.props.postionRedux,
                position: this.props.postionRedux && this.props.postionRedux.length > 0 ? this.props.postionRedux[0].key : ""
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArray: this.props.roleRedux,
                role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].key : ""
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let objectUrl = URL.createObjectURL(file);

            this.setState({
                previewImgUrl: objectUrl,
                avatar: file,
            });
        }
    }

    openPreviewImage = () => {
        this.setState({
            isOpen: true,
        });
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let arrCheck = ["email", "password", "firstName", "lastName", "phoneNumber", "address"];

        let isValid = true;

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;

                alert("Missing Parameter: " + arrCheck[i]);

                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();

        if (isValid === false) {
            return;
        } else {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
            });
        }
    }

    render() {
        let genders = this.state.genderArray;
        let positions = this.state.positonArray;
        let roles = this.state.roleArray;

        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        let { email, password, firstName, lastName, phoneNumber, address } = this.state;


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
                            <div className="col12">{isGetGenders === true ? "Loading gender" : ""}</div>
                            <div className="col-3">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    type="emaiL"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, "email") }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, "password") }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.firstName" /></label>
                                <input className="form-control" type="text"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, "firstName") }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.lastName" /></label>
                                <input className="form-control" type="text"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, "lastName") }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phoneNumber" /></label>
                                <input className="form-control" type="text"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, "phoneNumber") }}
                                />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, "address") }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select
                                    className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, "gender") }}
                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select
                                    className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, "position") }}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select
                                    className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, "role") }}
                                >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input type="file" id="previewImg" hidden
                                        onChange={(event) => { this.handleOnChangeImage(event) }}
                                    />
                                    <label className="label-upload" htmlFor="previewImg">Tải Ảnh<i className="fas fa-upload"></i></label>
                                    <div className="prev-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => { this.openPreviewImage() }}
                                    >

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => { this.handleSaveUser() }}
                                >
                                    <FormattedMessage id="manage-user.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}

                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        postionRedux: state.admin.positions,
        roleRedux: state.admin.roles,

        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositonStart: () => dispatch(actions.fetchPostionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => { dispatch(actions.createNewUser(data)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
