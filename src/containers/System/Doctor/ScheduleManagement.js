import React, { Component } from "react";
import { connect } from "react-redux";

class ScheduleManagement extends Component {
    render() {
        return (
            <>
                <div>
                    schedule management
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManagement);
