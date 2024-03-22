import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import DoctorIntroduction from "../containers/System/Doctor/DoctorIntroduction";
import SpecialtyManagement from "../containers/System/Specialty/SpecialtyManagement";
import ClinicManagement from "../containers/System/Clinic/ClinicManagement";
import DoctorManagement from "../containers/System/Doctor/DoctorManagement";

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                < div className="system-container" >
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/doctor-management" component={DoctorManagement} />
                            {/* <Route path="/system/user-redux" component={UserRedux} /> */}
                            {/* <Route path="/system/doctor-introduction" component={DoctorIntroduction} /> */}
                            <Route path="/system/specialty-management" component={SpecialtyManagement} />
                            <Route path="/system/clinic-management" component={ClinicManagement} />

                            <Route component={() => { return <Redirect to={systemMenuPath} />; }} />
                        </Switch>
                    </div>
                </div >
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
