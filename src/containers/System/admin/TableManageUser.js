import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES } from "../../../utils";

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
        };
    }

    componentDidMount() {
        this.props.getAllUsersRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersList: this.props.users,
            })
        }
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentsKey(user);

    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    render() {
        let { usersList } = this.state;

        let { language } = this.props;
        return (
            <>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th><FormattedMessage id="admin.manage-user.firstName" /></th>
                            <th><FormattedMessage id="admin.manage-user.lastName" /></th>
                            <th><FormattedMessage id="admin.manage-user.phoneNumber" /></th>
                            <th><FormattedMessage id="admin.manage-user.address" /></th>
                            <th><FormattedMessage id="admin.manage-user.gender" /></th>
                            <th><FormattedMessage id="admin.manage-user.position" /></th>
                            <th><FormattedMessage id="admin.manage-user.role" /></th>
                            <th><FormattedMessage id="admin.manage-user.action" /></th>
                        </tr>
                        {usersList && usersList.length > 0 && usersList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{language === LANGUAGES.VI ? item.genderData.valueVi : item.genderData.valueEn}</td>
                                    <td>{language === LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn}</td>
                                    <td>{language === LANGUAGES.VI ? item.roleData.valueVi : item.roleData.valueEn}</td>

                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => this.handleEditUser(item)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => this.handleDeleteUser(item)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,

        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsersRedux: () => dispatch(actions.getAllUsers()),
        deleteUserRedux: (id) => { dispatch(actions.deleteUser(id)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
