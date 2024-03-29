import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ScheduleManagement from "../containers/System/Doctor/ScheduleManagement";
import PatientManagement from "../containers/System/Doctor/PatientManagement";
import Header from "../containers/Header/Header";

class Doctor extends Component {
    render() {

        const { isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                < div className="system-container" >
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/schedule-management" component={ScheduleManagement} />
                            <Route path="/doctor/patient-management" component={PatientManagement} />
                        </Switch>
                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
