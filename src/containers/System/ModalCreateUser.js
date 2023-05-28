import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalCreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        };
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            //reset state
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
            })
        });
    }//bust event 

    componentDidMount() { };

    handleOnChangeInput = (event, id) => {//lay tat ca thong tin user nhap vao roi luu vao state
        //bad code. modify state
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => { console.log("check bad code: " + this.state) })

        //good code
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

    handleAddNewUser = () => {
        if (this.checkValidateInput() === true) {
            //call api
            this.props.createNewUser(this.state);//truyền hết state của thăng con cho thằng cha
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
                    Create New User
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "email"); }}
                                value={this.state.email}
                            />
                        </div>

                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, "password"); }}
                                value={this.state.password} />

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
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "address"); }}
                                value={this.state.address} />

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleAddNewUser(); }}
                        className="px-3"
                    >
                        Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser);
