import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        };
    }


    componentDidMount() {
        let user = this.props.currentUser;

        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "hashcode",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    };

    checkValidateInput = () => {//check user nhập vào có thiếu chỗ nào không
        let isValid = true;

        let arrayInput = ['email', 'password', 'firstName', 'lastName', 'address'];

        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                isValid = false;

                alert("Missing Parameter: " + arrayInput[i]);

                break;
            }
        }
        return isValid;
    };

    handleEditUser = () => {
        if (this.checkValidateInput() === true) {
            //call api edit user
            this.props.editUser(this.state);//truyền hết state của thăng con cho thằng cha
        };
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.props.toggleFromParent(); }}
                className={"modal-user-container"}
                size="lg"
            >
                <ModalHeader toggle={() => { this.props.toggleFromParent(); }}>
                    Edit New User
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "email"); }}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, "password"); }}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName"); }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName"); }}
                                value={this.state.lastName}
                            />
                            <div className="input-container max-width-input">
                                <label>Address</label>
                                <input
                                    type="text"
                                    onChange={(event) => { this.handleOnChangeInput(event, "address"); }}
                                    value={this.state.address}>
                                </input>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleEditUser(); }}
                        className="px-3"
                    >
                        Save Change
                    </Button>
                    {""}
                    <Button
                        color="secondary" onClick={() => { this.props.toggleFromParent(); }}
                        className="px-3"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
