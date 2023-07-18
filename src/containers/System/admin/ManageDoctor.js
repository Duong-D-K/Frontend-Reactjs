import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDoctorByIdService } from "../../../services/userService";
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

            listDoctors: [],
            doctor: "",

            hasDataYet: false,
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
        if (prevProps.doctorList !== this.props.doctorList) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorList);

            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorList);

            this.setState({
                listDoctors: dataSelect,
            });
        }

        if (prevProps.doctor !== this.props.doctor) {
            this.setState({
                doctor: this.props.doctor,
            });
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasDataYet } = this.state;

        this.props.saveDoctorInfo({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,

            action: hasDataYet === true ? CRUD_ACTIONS.UPDATE : CRUD_ACTIONS.CREATE,
        });
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor: selectedDoctor });

        let response = await getDoctorByIdService(selectedDoctor.value);

        if (response && response.code === 0 && response.data && response.data.Markdown) {
            this.setState({
                contentHTML: response.data.Markdown.contentHTML,
                contentMarkdown: response.data.Markdown.contentMarkdown,
                description: response.data.Markdown.description,

                hasDataYet: true,
            });
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",

                hasDataYet: false,
            })
        }

        // this.props.getDoctorById(selectedDoctor.value);


    };
    handleOnChangeDesc = event => {
        this.setState({
            description: event.target.value,
        })
    }
    render() {
        let { hasDataYet } = this.state;

        // let { doctor } = this.state;

        // console.log("manage doctor check", doctor);

        // if (doctor && doctor.Markdown) {
        //     this.setState({
        //         contentHTML: "",
        //         contentMarkdown: "",
        //         description: "",

        //         hasDataYet: false,
        //     })
        // } else {
        //     this.setState({
        //         contentHTML: doctor.Markdown.contentHTML,
        //         contentMarkdown: doctor.Markdown.contentMarkdown,
        //         description: doctor.Markdown.description,

        //         hasDataYet: true,
        //     })
        // }

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
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={hasDataYet === true ? "save-content-doctor" : "create-content-doctor"}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasDataYet === true ? <span>Lưu Thông Tin</span> : <span>Tạo Thông Tin</span>}
                </button>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctorList: state.admin.allDoctors,
        doctor: state.admin.doctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => { dispatch(actions.fetchAllDoctors()) },
        saveDoctorInfo: (data) => { dispatch(actions.saveDoctorInfo(data)) },
        getDoctorById: (id) => { dispatch(actions.getDoctorById(id)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
