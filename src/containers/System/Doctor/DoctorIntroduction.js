import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDoctorByIdService } from "../../../services/userService";
import "./DoctorIntroduction.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { FormattedMessage } from "react-intl";
import { template } from "lodash";

const mdParser = new MarkdownIt();
class DoctorIntroduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // //save to markdown
            contentMarkdown: "",
            contentHTML: "",
            introduction: "",
            note: "",

            listDoctors: [],
            selectedDoctor: "",
        };
    }

    async componentDidMount() {
        await this.props.getAllDoctorsRedux();
    }

    buildDataInputSelect = (inputData, type) => {
        if (type === "user") {
            return (inputData?.length > 0)
                ? inputData.map(item => ({
                    label: this.props.language === LANGUAGES.VI ? `${item.lastName} ${item.firstName}` : `${item.firstName} ${item.lastName}`,
                    value: item.id
                }))
                : [];
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "user");

            this.setState({
                listDoctors: dataSelect,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveDoctorIntroduction = () => {
        this.props.saveDoctorIntroductionRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            introduction: this.state.introduction,
            doctorId: this.state.selectedDoctor.value,
            note: this.state.note,
        });
    }

    handleChange = async (selectedDoctor) => {

        this.setState({ selectedDoctor: selectedDoctor });

        let response = await getDoctorByIdService(selectedDoctor.value);

        console.log(response)


        if (response && response.code === 0 && response.data) {

            this.setState({
                note: response.data.note,
                contentHTML: response.data.contentHTML ? response.data.contentHTML : "",
                contentMarkdown: response.data.contentMarkdown ? response.data.contentMarkdown : "",
                introduction: response.data.introduction ? response.data.introduction : "",
            })
        }
    };


    handleOnChangeText = (event, stateName) => {
        this.setState({
            [stateName]: event.target.value,
        })
    }

    render() {
        return (
            <div className="doctor-introduction container-fluid">
                <div className="doctor-introduction-title">
                    <FormattedMessage id="admin.doctor.doctor-introduction.title" />
                </div>
                <div className="more-info">
                    <div className="col-2 form-group">
                        <label>
                            <FormattedMessage id="admin.doctor.doctor-introduction.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.doctor.doctor-introduction.select-doctor" />}
                        />
                    </div>
                </div>
                <div className="doctor-info-extra row">
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="admin.doctor.doctor-introduction.intro" />
                        </label>
                        <textarea
                            className="form-control" rows="3"
                            onChange={(event) => this.handleOnChangeText(event, "introduction")}
                            value={this.state.introduction}
                        >
                        </textarea>
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="admin.doctor.doctor-introduction.note" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, "note")}
                            value={this.state.note}
                        >
                        </input>
                    </div>
                </div>
                <div className="doctor-introduction-editor col-12">
                    <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className="save-content-doctor"
                    onClick={() => this.handleSaveDoctorIntroduction()}
                >
                    <span><FormattedMessage id="admin.doctor.doctor-introduction.save" /></span>
                </button>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allSpecialties: state.admin.allSpecialties,
        allClinics: state.admin.allClinics,
        doctor: state.admin.doctor,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorsRedux: () => { dispatch(actions.getAllDoctors()) },
        saveDoctorIntroductionRedux: (data) => { dispatch(actions.saveDoctorIntroduction(data)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorIntroduction);
