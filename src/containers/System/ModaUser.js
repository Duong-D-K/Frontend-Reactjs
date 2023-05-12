import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleFromParent();
    };

    render() {
        console.log("check chuild props", this.props);
        console.log("chekc child open modal", this.props.isOpen);
        console.log("chekc child open modal", this.props.test);

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={"modal-user-container"}
                size="lg"
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Create New User
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text"></input>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password"></input>
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input type="text"></input>
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input type="text"></input>
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text"></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.toggle();
                        }}
                        className="px-3"
                    >
                        Save Changes
                    </Button>
                    {""}
                    <Button
                        color="secondary"
                        onClick={() => {
                            this.toggle();
                        }}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
