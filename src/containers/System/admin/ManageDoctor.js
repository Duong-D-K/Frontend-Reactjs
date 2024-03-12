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
import { template } from "lodash";

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
            listClinic: [],
            listSpecialty: [],

            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            selectedClinic: "",
            selectedSpecialty: "",

            clinicName: "",
            clinicAddress: "",
            note: "",

            // clinicId: "",
            // specialtyId: "",
            doctor: "",
        };
    }

    async componentDidMount() {
        await this.props.getAllDoctorsRedux();
        await this.props.getAllRequiredDoctorInfoRedux();
        await this.props.getAllSpecialtiesRedux();
        this.props.getAllClinicsRedux();
    }

    buildDataInputSelect = (inputData, type) =>
        (inputData?.length > 0)
            ? inputData.map(item => ({
                label: this.props.language === LANGUAGES.VI ? (type === "USERS" ? `${item.lastName} ${item.firstName}` : item.valueVi) : (type === "USERS" ? `${item.firstName} ${item.lastName}` : item.valueEn),
                value: type === "USERS" ? item.id : item.keyMap,
            }))
            : [];

    buildDataSpecialty = (data) => {
        return data.map(item => ({
            label: this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn,
            value: item.id,
        }));
    }

    buildDataClinic = (data) => {
        return data.map(item => ({
            label: item.name,
            value: item.id,
        }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");

            console.log("dataSelect", dataSelect)

            this.setState({
                listDoctors: dataSelect,
            });
        }

        if (this.props.allSpecialties !== prevProps.allSpecialties) {
            let dataSelect = this.buildDataSpecialty(this.props.allSpecialties);

            this.setState({
                listSpecialty: dataSelect,
            });
        }

        if (this.props.allClinics !== prevProps.allClinics) {
            this.setState({
                listClinic: this.buildDataClinic(this.props.allClinics),
            })
        }

        if (prevProps.language !== this.props.language) {
            let { responsePrice, responsePayment, responseProvince } = this.props.allRequiredDoctorInfo;

            this.setState({
                listDoctors: this.buildDataInputSelect(this.props.allDoctors, "USERS"),
                listPrice: this.buildDataInputSelect(responsePrice),
                listPayment: this.buildDataInputSelect(responsePayment),
                listProvince: this.buildDataInputSelect(responseProvince),
                listSpecialty: this.buildDataSpecialty(this.props.allSpecialties),
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
            clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value,
        });
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor: selectedDoctor });
        let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;

        let response = await getDoctorByIdService(selectedDoctor.value);

        if (response && response.code === 0 && response.data) {
            if (response.data.Doctor_Information?.Specialty && response.data.Doctor_Information?.Clinic) {

                let priceId = response.data.Doctor_Information.priceId;
                let paymentId = response.data.Doctor_Information.paymentId;
                let provinceId = response.data.Doctor_Information.provinceId;
                let specialty = response.data.Doctor_Information.Specialty;
                let clinic = response.data.Doctor_Information.Clinic;

                let selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                })

                let selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId;
                })
                let selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId;
                })

                let selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialty.id;
                })

                let selectedClinic = listClinic.find(item => {
                    return item && item.value === clinic.id;
                })

                this.setState({
                    clinicName: response.data.Doctor_Information.clinicName,
                    clinicAddress: response.data.Doctor_Information.clinicAddress,
                    note: response.data.Doctor_Information.note,

                    selectedPrice: selectedPrice,
                    selectedPayment: selectedPayment,
                    selectedProvince: selectedProvince,
                    selectedSpecialty: selectedSpecialty,
                    selectedClinic: selectedClinic,
                })
            } else {
                this.setState({
                    clinicName: "",
                    clinicAddress: "",
                    note: "",

                    selectedPrice: "",
                    selectedPayment: "",
                    selectedProvince: "",
                    selectedSpecialty: "",
                    selectedClinic: "",
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
                <div className="doctor-specialty-clinic row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleOnChangeSelect}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-specialty" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Chọn Phòng Khám</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleOnChangeSelect}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-specialty" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor col-12">
                    <MdEditor
                        style={{ height: '400px' }}
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
        allSpecialties: state.admin.allSpecialties,
        allClinics: state.admin.allClinics,
        doctor: state.admin.doctor,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorsRedux: () => { dispatch(actions.getAllDoctors()) },
        getAllSpecialtiesRedux: () => dispatch(actions.getAllSpecialties()),
        saveDoctorInfoRedux: (data) => { dispatch(actions.saveDoctorInfo(data)) },
        getDoctorById: (id) => { dispatch(actions.getDoctorById(id)) },
        getAllClinicsRedux: () => dispatch(actions.getAllClinics()),

        getAllRequiredDoctorInfoRedux: () => dispatch(actions.getRequiredDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
