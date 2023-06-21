import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                userRedux: this.props.users,
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
        let arrUsers = this.state.userRedux;

        return (
            <React.Fragment>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Position</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.positionId}</td>
                                    <td>{item.roleId}</td>
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

                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsers()),
        deleteUserRedux: (id) => { dispatch(actions.deleteUser(id)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
