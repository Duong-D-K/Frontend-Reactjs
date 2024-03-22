import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils } from "../../../utils";
import "./ClinicManagement.scss";
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import EditClinicModal from "./EditClinicModal";
import _, { sortBy, sortedIndex } from "lodash";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt();

class ClinicManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: "",
            openEditClinicModal: false,

            clinicEdit: {}
        };
    }
    async componentDidMount() {
        // await this.props.getAllProvinceRedux();
        this.props.getAllClinicsRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allClinics !== prevProps.allClinics) {
            this.setState({
                listClinic: this.props.allClinics,
            })
        }
    }

    toggleEditClinicModal = () => {
        this.setState({
            openEditClinicModal: !this.state.openEditClinicModal,
        })
    }

    editClinic = async (clinic) => {
        try {
            if (clinic.actions === "edit") {
                this.props.updateClinicRedux({
                    id: clinic.id,
                    name: clinic.name,
                    address: clinic.address,
                    image: clinic.image,
                    descriptionMarkdown: clinic.descriptionMarkdown,
                    descriptionHTML: clinic.descriptionHTML,
                    provinceId: clinic.selectedProvince.value,
                    districtId: clinic.selectedDistrict.value,
                });

                this.setState({ openEditClinicModal: false });
            }
            else if (clinic.actions === "create") {
                this.props.createClinicRedux({
                    name: clinic.name,
                    address: clinic.address,
                    image: clinic.image,
                    descriptionMarkdown: clinic.descriptionMarkdown,
                    descriptionHTML: clinic.descriptionHTML,
                    provinceId: clinic.selectedProvince.value,
                    districtId: clinic.selectedDistrict.value,
                });

                this.setState({ openEditClinicModal: false });
            }
        } catch (e) {
            console.log(e);
        }
    }

    deleteClinic = async (clinic) => {
        try {
            await this.props.deleteClinicRedux(clinic.id);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let { listClinic } = this.state;

        console.log("listClinic", listClinic);

        return (
            <>
                <div className="clinic-management container-fluid">
                    {this.state.openEditClinicModal &&
                        <EditClinicModal
                            isOpen={this.state.openEditClinicModal}
                            toggleFromParent={this.toggleEditClinicModal}

                            currentClinic={this.state.clinicEdit}

                            editClinic={this.editClinic}
                        />
                    }
                    <div className="clinic-management-title">
                        <FormattedMessage id="admin.clinic.clinic-management.title" />
                    </div>
                    <div className="add-new-clinic mx-1">
                        <button
                            className="btn-create-clinic btn btn-primary px-3"
                            onClick={() => this.setState({ openEditClinicModal: true, clinicEdit: { key: "create", data: "" }, })}
                        >
                            <i className="fas fa-plus"></i><FormattedMessage id="admin.clinic.clinic-management.add-new" />
                        </button>
                    </div>
                    <div className="user-table mt-4 mx-1">
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id="admin.clinic.clinic-management.ordinal" /></th>
                                    <th><FormattedMessage id="admin.clinic.clinic-management.name" /></th>
                                    <th><FormattedMessage id="admin.clinic.clinic-management.address" /></th>
                                    <th><FormattedMessage id="admin.clinic.clinic-management.district" /></th>
                                    <th><FormattedMessage id="admin.clinic.clinic-management.province" /></th>
                                    <th><FormattedMessage id="admin.clinic.clinic-management.contentHTML" /></th>
                                    <th><FormattedMessage id="admin.clinic.clinic-management.contentMarkdown" /></th>
                                    <th><FormattedMessage id="admin.clinic.clinic-management.image" /></th>
                                    <th><FormattedMessage id="admin.clinic.clinic-management.action" /></th>
                                </tr>
                                {listClinic ? listClinic.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>{this.props.language === LANGUAGES.VI ? item.district.nameVi : item.district.nameEn}</td>
                                            <td>{this.props.language === LANGUAGES.VI ? item.province.nameVi : item.province.nameEn}</td>
                                            <td>{item.descriptionHTML && item.descriptionHTML.substring(0, 20)}.....</td>
                                            <td>{item.descriptionMarkdown && item.descriptionMarkdown.substring(0, 20)}.....</td>
                                            <td>
                                                <div className="preview-img-container">
                                                    <div className="prev-image"
                                                        style={{
                                                            backgroundImage: `url(${item.image})`,
                                                        }}
                                                    >
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => {
                                                        this.setState({
                                                            openEditClinicModal: true,
                                                            clinicEdit: {
                                                                key: "edit",
                                                                data: item,
                                                            },
                                                        })
                                                    }}><FormattedMessage id="admin.clinic.clinic-management.edit" />
                                                </button>
                                                <button className="btn-delete" onClick={() => this.deleteClinic(item)}><FormattedMessage id="admin.clinic.clinic-management.delete" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }) : <></>}
                            </tbody>
                        </table>
                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allClinics: state.admin.allClinics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClinicsRedux: () => dispatch(actions.getAllClinics()),
        updateClinicRedux: (data) => { dispatch(actions.updateClinic(data)) },
        createClinicRedux: (data) => { dispatch(actions.createClinic(data)) },
        deleteClinicRedux: (clinicId) => { dispatch(actions.deleteClinic(clinicId)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManagement);
