import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsersService, createNewUserService, deleteUserSerive, editUserService } from "../../services/userService";
import { emitter } from "../../utils/emitter";
import ModalCreateUser from "./ModalCreateUser";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
    /**life cycle
 * Run component
 * 1: Run contructor -> init status
 * 2: Did mount (set state before rendering to monitor)
 * 3: Render (rerender)
 * 4: Update component
 */

    constructor(props) {
        super(props);
        this.state = {
            //state la ham bat dong bo
            arrUser: [],
            isOpenCreateModalUser: false,
            isOpenEditModalUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        //chức năng là gọi api lấy giá trị vào và set state cho component
        //state có nhiệm vụ lưu trữ giá trị và ta sẽ dùng state ngay trong render()
        //render() sẽ render cho các bạn nhìn thấy
        await this.getAllUsers();
    };

    toggleUserCreateModal = () => {
        this.setState({
            isOpenCreateModalUser: !this.state.isOpenCreateModalUser,
        });
    };

    toggleUserEditModal = () => {
        this.setState({
            isOpenEditModalUser: !this.state.isOpenEditModalUser,
        })

    }

    getAllUsers = async () => {
        let response = await getAllUsersService("ALL");

        if (response && response.code === 0) {
            this.setState({
                arrUser: response.users,
            });
        }
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);

            if (response && response.code !== 0) {
                alert(response.message);
            } else {
                await this.getAllUsers();
                this.setState({
                    isOpenCreateModalUser: false,
                });

                emitter.emit("EVENT_CLEAR_MODAL_DATA");//clear modal 
            }
        } catch (e) {
            console.log(e);
        }
    }

    deleteUser = async (user) => {
        try {
            let response = await deleteUserSerive(user.id);

            if (response && response.code === 0) {
                await this.getAllUsers();
            }
            else {
                alert(response.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    editUser = async (user) => {
        try {
            let response = await editUserService(user);

            if (response && response.code === 0) {
                this.setState({ isOpenEditModalUser: false });

                await this.getAllUsers();
            } else {
                alert(response.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUsers = this.state.arrUser;
        return (
            <div className="user-container">
                <ModalCreateUser
                    isOpen={this.state.isOpenCreateModalUser}
                    toggleFromParent={this.toggleUserCreateModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditModalUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEditModalUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }
                <div className="title text-center">
                    Manage User With Duy Khanh
                </div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick={() => this.setState({ isOpenCreateModalUser: true })}>
                        <i className="fas fa-plus"></i>Add New User
                    </button>
                </div>
                <div className="user-table mt-4 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers ? arrUsers.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => {
                                                    this.setState({
                                                        isOpenEditModalUser: true,
                                                        userEdit: item,
                                                    })
                                                }}><i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn-delete" onClick={() => this.deleteUser(item)}><i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }) : <></>}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
