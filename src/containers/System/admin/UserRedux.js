import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
    constructor(prpos) {
        super(prpos);
        this.state = {
            genderArray: [],
            positionArray: [],
            roleArray: [],
            previewImgUrl: [],
            isOpen: false,

            id: "",
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

            action: "",
        }
    }

    async componentDidMount() {
        this.props.getGenderRedux();
        this.props.getPositonRedux();
        this.props.getRoleRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArray: this.props.genderRedux,
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].keyMap : "",
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArray: this.props.positionRedux,
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].keyMap : "",
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArray: this.props.roleRedux,
                role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].keyMap : "",
            });
        }
        if (prevProps.users !== this.props.users) {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].keyMap : "",
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].keyMap : "",
                role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].keyMap : "",
                avatar: "",

                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: "",
            });
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            let objectUrl = URL.createObjectURL(file);

            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64,
            });
        }
    }

    handleOnChange = (event, id) => {
        this.setState({
            [id]: event.target.value,
        })
    }

    checkValidateInput = () => {
        let arrCheck = ["email", "password", "firstName", "lastName", "phoneNumber", "address"];

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                alert("Missing Parameter: " + arrCheck[i]);

                return false;
            }
        }
        return true;
    }

    handleCreateUser = () => {
        let isValid = this.checkValidateInput();

        let { action } = this.state;

        if (isValid === false) {
            return;
        } else {
            if (action === CRUD_ACTIONS.CREATE) {
                this.props.createNewUserRedux({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    role: this.state.role,
                    position: this.state.position,
                    avatar: this.state.avatar,
                });
            }

            if (action === CRUD_ACTIONS.UPDATE) {
                this.props.updateUserRedux({
                    id: this.state.id,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    role: this.state.role,
                    position: this.state.position,
                    avatar: this.state.avatar,
                });
            }
        }
    }

    handleEditUserFromParents = (user) => {
        let imageBase64;
        if (user.image) {
            imageBase64 = new Buffer(user.image, "base64").toString("binary");
        }
        this.setState({
            id: user.id,
            email: user.email,
            password: "HashCode",
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: "",

            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.UPDATE,
        });
    }

    render() {
        let genders = this.state.genderArray;
        let positions = this.state.positionArray;
        let roles = this.state.roleArray;

        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;

        return (
            <div className="user-redux container-fluid">
                <div className="title">
                    <div className="text-center">
                        <FormattedMessage id="admin.manage-user.title" />
                    </div>
                </div>

                <div className="user-redux-body">

                    <div className="row">
                        <div className="col-12 my-3">
                            <FormattedMessage id="admin.manage-user.add" />
                        </div>
                        <div className="col12">{isGetGenders === true ? "Loading gender" : ""}</div>
                        <div className="col-3">
                            <label>Email</label>
                            <input
                                className="form-control"
                                type="emaiL"
                                value={email}
                                onChange={(event) => { this.handleOnChange(event, "email") }}
                                disabled={this.state.action === CRUD_ACTIONS.UPDATE ? true : false}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="admin.manage-user.password" /></label>
                            <input
                                className="form-control"
                                type="password"
                                value={password}
                                onChange={(event) => { this.handleOnChange(event, "password") }}
                                disabled={this.state.action === CRUD_ACTIONS.UPDATE ? true : false}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="admin.manage-user.firstName" /></label>
                            <input className="form-control" type="text"
                                value={firstName}
                                onChange={(event) => { this.handleOnChange(event, "firstName") }}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="admin.manage-user.lastName" /></label>
                            <input className="form-control" type="text"
                                value={lastName}
                                onChange={(event) => { this.handleOnChange(event, "lastName") }}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="admin.manage-user.phoneNumber" /></label>
                            <input className="form-control" type="text"
                                value={phoneNumber}
                                onChange={(event) => { this.handleOnChange(event, "phoneNumber") }}
                            />
                        </div>
                        <div className="col-9">
                            <label><FormattedMessage id="admin.manage-user.address" /></label>
                            <input className="form-control" type="text"
                                value={address}
                                onChange={(event) => { this.handleOnChange(event, "address") }}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="admin.manage-user.gender" /></label>
                            <select
                                className="form-control"
                                onChange={(event) => { this.handleOnChange(event, "gender") }}
                                value={gender}
                            >
                                {genders && genders.length > 0 && genders.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="admin.manage-user.position" /></label>
                            <select
                                className="form-control"
                                onChange={(event) => { this.handleOnChange(event, "position") }}
                                value={position}
                            >
                                {positions && positions.length > 0 && positions.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="admin.manage-user.role" /></label>
                            <select
                                className="form-control"
                                onChange={(event) => { this.handleOnChange(event, "role") }}
                                value={role}
                            >
                                {roles && roles.length > 0 && roles.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="admin.manage-user.image" /></label>
                            <div className="preview-img-container">
                                <input type="file" id="previewImg" hidden
                                    onChange={(event) => { this.handleOnChangeImage(event) }}
                                />
                                <label className="label-upload" htmlFor="previewImg">Tải Ảnh<i className="fas fa-upload"></i></label>
                                <div className="prev-image"
                                    style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                    onClick={() => {
                                        this.setState({ isOpen: true });
                                    }}
                                >

                                </div>
                            </div>
                        </div>
                        <div className="col-12 my-3">
                            <button
                                className={this.state.action === CRUD_ACTIONS.UPDATE ? "btn btn-warning" : "btn btn-primary"}
                                onClick={() => { this.handleCreateUser() }}
                            >
                                {this.state.action === CRUD_ACTIONS.UPDATE ?
                                    <FormattedMessage id="admin.manage-user.edit" />
                                    :
                                    <FormattedMessage id="admin.manage-user.create" />
                                }
                            </button>
                        </div>
                        <div className="col-12 mb-5">
                            <TableManageUser
                                handleEditUserFromParentsKey={this.handleEditUserFromParents}
                                action={this.state.action}
                            />
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
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,

        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderRedux: () => dispatch(actions.getGender()),
        getPositonRedux: () => dispatch(actions.getPostion()),
        getRoleRedux: () => dispatch(actions.getRole()),

        createNewUserRedux: (data) => { dispatch(actions.createNewUser(data)) },
        updateUserRedux: (data) => dispatch(actions.updateUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
