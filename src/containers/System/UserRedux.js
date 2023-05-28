import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
class UserRedux extends Component {
    constructor(prpos) {
        super(prpos);
        this.stat = {

        }
    }

    componentDidMount() { }

    render() {
        return (
            <div className="user-redux-cotainer">
                <div className="title">
                    <div className="text-center">User Redux Duong Duy Khanh</div>
                </div>
                <div className="user-redux-body">
                    <div className="">
                        Thêm Mới Người Dùng
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
