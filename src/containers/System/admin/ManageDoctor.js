import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';;

const mdParser = new MarkdownIt(/* Markdown-it options */);//convert from html to text

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: "",
            description: "",
            listDoctors: "",

        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let dataSelect = this.buildDataInputSelect(this.props.doctors);

            this.setState({
                listDoctors: dataSelect,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.doctors);

            this.setState({
                listDoctors: dataSelect,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown = () => {
        this.props.saveDoctorInfo({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
        });
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };
    handleOnChangeDesc = event => {
        this.setState({
            description: event.target.value,
        })
    }
    render() {
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    Tạo Thêm Thông Tin Bác Sĩ
                </div>
                <div className="more-info mb-4">
                    <div className="content-left form-group">
                        <label>Chọn Bác Sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className="content-right">
                        <label>Thông Tin Giới Thiệu</label>
                        <textarea
                            className="form-control" rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button
                    className="save-content-doctor"
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    Lưu Thông Tin
                </button>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => { dispatch(actions.fetchAllDoctors()) },
        saveDoctorInfo: (data) => { dispatch(actions.saveDoctorInfo(data)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
