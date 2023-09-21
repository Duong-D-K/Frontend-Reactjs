import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDoctorByIdService } from "../../../services/userService";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);//convert from html to text

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: "",
            description: "",
            listDoctors: [],
            hasDataYet: false,

            //save to doctor_information
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            clinicName: "",
            clinicAddress: "",
            note: "",

            doctor: "",
        };
    }

    componentDidMount() {
        this.props.getAllDoctorsRedux();
        this.props.getAllRequiredDoctorInfoRedux();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === "USERS" ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === "USERS" ? `${item.firstName} ${item.lastName}` : item.valueEn;

                object.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorList !== this.props.doctorList) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorList, "USERS");

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

        if (this.props.allRequiredDoctorInfo !== prevProps.allRequiredDoctorInfo) {
            let { responsePrice, responsePayment, responseProvince } = this.props.allRequiredDoctorInfo;

            let dataSelectPrice = this.buildDataInputSelect(responsePrice);
            let dataSelectPayment = this.buildDataInputSelect(responsePayment);
            let dataSelectProvince = this.buildDataInputSelect(responseProvince);

            console.log("check news", dataSelectPrice, dataSelectPayment, dataSelectProvince);

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
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
    };

    handleOnChangeDesc = event => {
        this.setState({
            description: event.target.value,
        })
    }

    render() {
        let { hasDataYet } = this.state;

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="manage-doctor.title" />
                </div>
                <div className="more-info mb-4">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage id="manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                            placeholder={"Chọn Bác Sĩ"}
                        />
                    </div>
                    <div className="content-right">
                        <label>
                            <FormattedMessage id="manage-doctor.intro" />
                        </label>
                        <textarea
                            className="form-control" rows="1"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="doctor-info-extra row">
                    <div className="col-4 form-group">
                        <label>Chọn Giá</label>
                        <Select
                            //value={this.state.selectedDoctor}
                            //onChange={this.handleChange}
                            options={this.state.listPrice}
                            placeholder={"Chọn Giá"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn Phương Thức Thanh Toán</label>
                        <Select
                            //value={this.state.selectedDoctor}
                            //onChange={this.handleChange}
                            options={this.state.listPayment}
                            placeholder={"Chọn Phương Thức Thanh Toán"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn Tỉnh Thành</label>
                        <Select
                            //value={this.state.selectedDoctor}
                            //onChange={this.handleChange}
                            options={this.state.listProvince}
                            placeholder={"Chọn Tỉnh Thành"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Tên Phòng Khám</label>
                        <input className="form-control">

                        </input>
                    </div>
                    <div className="col-4 form-group">
                        <label>Địa Chỉ Phòng Khám</label>
                        <input className="form-control">

                        </input>
                    </div>
                    <div className="col-4 form-group">
                        <label>Ghi Chú</label>
                        <input className="form-control">
                        </input>
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
                    {hasDataYet === true ?
                        <span><FormattedMessage id="manage-doctor.save" /></span>
                        :
                        <span><FormattedMessage id="manage-doctor.add" /></span>
                    }
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
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorsRedux: () => { dispatch(actions.getAllDoctors()) },
        saveDoctorInfo: (data) => { dispatch(actions.saveDoctorInfo(data)) },
        getDoctorById: (id) => { dispatch(actions.getDoctorById(id)) },

        getAllRequiredDoctorInfoRedux: () => dispatch(actions.getRequiredDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
