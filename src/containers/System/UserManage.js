import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, createNewUserService } from "../../services/userService";
import ModalUser from "./ModalUser";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //state la ham bat dong bo
            arrUser: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        //chức năng là gọi api lấy giá trị vào và set state cho component
        //state có nhiệm vụ lưu trữ giá trị và ta sẽ dùng state ngay trong render()
        //render() sẽ render cho các bạn nhìn thấy
        await this.getAllUserFromReact();
    };

    getAllUserFromReact = async () => {
        let response = await getAllUsers("ALL");

        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users,
            });
        }
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };
    /**life cycle
     * Run component
     * 1: Run contructor -> init status
     * 2: Did mount (set state before rendering to monitor)
     * 3: Render (rerender)
     * 4: Update component
     *
     *
     */
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);

            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false,
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        console.log(this.state);
        let arrUsers = this.state.arrUser;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className="title text-center">
                    Manage User With Duy Khanh
                </div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick={() => this.setState({ isOpenModalUser: true })}>
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
                            {arrUsers && arrUsers.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit"><i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn-delete"><i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
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
