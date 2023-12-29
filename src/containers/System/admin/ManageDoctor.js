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

const mdParser = new MarkdownIt();
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
                if (type === "USERS") {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;

                    object.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;

                    object.value = item.id;

                    result.push(object);
                } else {
                    let object = {};
                    let labelVi = item.valueVi;
                    let labelEn = item.valueEn;

                    object.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;

                    object.value = item.keyMap;

                    result.push(object);
                }
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");

            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let { responsePrice, responsePayment, responseProvince } = this.props.allRequiredDoctorInfo;

            this.setState({
                listDoctors: this.buildDataInputSelect(this.props.allDoctors, "USERS"),
                listPrice: this.buildDataInputSelect(responsePrice),
                listPayment: this.buildDataInputSelect(responsePayment),
                listProvince: this.buildDataInputSelect(responseProvince),
            });
        }

        if (prevProps.doctor !== this.props.doctor) {
            this.setState({
                doctor: this.props.doctor,
            });
        }

        if (this.props.allRequiredDoctorInfo !== prevProps.allRequiredDoctorInfo) {
            let { responsePrice, responsePayment, responseProvince } = this.props.allRequiredDoctorInfo;

            this.setState({
                listPrice: this.buildDataInputSelect(responsePrice),
                listPayment: this.buildDataInputSelect(responsePayment),
                listProvince: this.buildDataInputSelect(responseProvince),
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

        this.props.saveDoctorInfoRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,

            action: hasDataYet === true ? CRUD_ACTIONS.UPDATE : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,
        });
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor: selectedDoctor });
        let { listPrice, listPayment, listProvince } = this.state;

        let response = await getDoctorByIdService(selectedDoctor.value);

        if (response && response.code === 0 && response.data) {
            if (response.data.Doctor_Information) {
                let priceId = response.data.Doctor_Information.priceId;
                let paymentId = response.data.Doctor_Information.paymentId;
                let provinceId = response.data.Doctor_Information.provinceId;

                let selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                })
                let selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId;
                })
                let selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId;
                })

                this.setState({
                    clinicName: response.data.Doctor_Information.clinicName,
                    clinicAddress: response.data.Doctor_Information.clinicAddress,
                    note: response.data.Doctor_Information.note,

                    selectedPrice: selectedPrice,
                    selectedPayment: selectedPayment,
                    selectedProvince: selectedProvince,
                })
            } else {
                this.setState({
                    clinicName: "",
                    clinicAddress: "",
                    note: "",

                    selectedPrice: "",
                    selectedPayment: "",
                    selectedProvince: "",
                })
            }

            this.setState({
                contentHTML: response.data.Markdown.contentHTML ? response.data.Markdown.contentHTML : "",
                contentMarkdown: response.data.Markdown.contentMarkdown ? response.data.Markdown.contentMarkdown : "",
                description: response.data.Markdown.description ? response.data.Markdown.description : "",

                hasDataYet: true,
            });


        } else {
            this.setState({
                hasDataYet: false
            })
        }
    };

    handleOnChangeSelect = (selectedOption, name) => {
        this.setState({
            [name.name]: selectedOption,
        })
    }

    handleOnChangeText = (event, stateName) => {
        this.setState({
            [stateName]: event.target.value,
        })
    }

    render() {
        let { hasDataYet } = this.state;

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="col-2 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="col-2 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleOnChangeSelect}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-2 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleOnChangeSelect}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-2 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleOnChangeSelect}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-2 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.clinic-name" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, "clinicName")}
                            value={this.state.clinicName}
                        >
                        </input>
                    </div>
                    <div className="col-2 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.clinic-address" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, "clinicAddress")}
                            value={this.state.clinicAddress}
                        >
                        </input>
                    </div>
                </div>
                <div className="doctor-info-extra row">
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea
                            className="form-control" rows="3"
                            onChange={(event) => this.handleOnChangeText(event, "description")}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, "note")}
                            value={this.state.note}
                        >
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
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                        :
                        <span><FormattedMessage id="admin.manage-doctor.add" /></span>
                    }
                </button>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        doctor: state.admin.doctor,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorsRedux: () => { dispatch(actions.getAllDoctors()) },
        saveDoctorInfoRedux: (data) => { dispatch(actions.saveDoctorInfo(data)) },
        getDoctorById: (id) => { dispatch(actions.getDoctorById(id)) },

        getAllRequiredDoctorInfoRedux: () => dispatch(actions.getRequiredDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
