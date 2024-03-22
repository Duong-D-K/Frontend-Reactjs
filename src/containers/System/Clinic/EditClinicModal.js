import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils } from "../../../utils";
import "./ClinicManagement.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import _, { sortBy, sortedIndex } from "lodash";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt();

class ClinicManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: "",

            id: "",
            name: "",
            address: "",
            image: "",
            descriptionMarkdown: "",
            descriptionHTML: "",

            listProvinces: "",
            selectedProvince: "",

            listDistricts: "",
            selectedDistrict: "",
        };
    }
    async componentDidMount() {
        let clinic = this.props.currentClinic;

        if (clinic.key === "edit") {
            this.setState({
                actions: clinic.key,
                id: clinic.data.id,
                name: clinic.data.name,
                address: clinic.data.address,
                image: clinic.data.image,
                descriptionMarkdown: clinic.data.descriptionMarkdown,
                descriptionHTML: clinic.data.descriptionHTML,

                selectedProvince: {
                    label: this.props.language === LANGUAGES.VI ? clinic.data.province.nameVi : clinic.data.province.nameEn,
                    value: clinic.data.province.id,
                },

                selectedDistrict: {
                    label: this.props.language === LANGUAGES.VI ? clinic.data.district.nameVi : clinic.data.district.nameEn,
                    value: clinic.data.province.id,
                }
            })
        } else if (clinic.key === "create") {
            this.setState({ actions: clinic.key })
        }
        await this.props.getAllProvinceRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.listProvinces !== prevProps.listProvinces) {
            this.setState({
                listProvinces: this.buildDataReactSelect(this.props.listProvinces),
            })
        }

        if (this.props.listDistricts !== prevProps.listDistricts) {
            this.setState({
                listDistricts: this.buildDataReactSelect(this.props.listDistricts),
            })
        }
    }

    buildDataReactSelect = (data) => {
        // Tạo mảng mới từ dữ liệu đầu vào
        const newDataArray = data.map(item => ({
            label: this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn,
            value: item.id,
        }));

        // Sắp xếp mảng mới theo giá trị tăng dần của trường 'value' (id)
        newDataArray.sort((a, b) => a.value - b.value);

        return newDataArray;
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnChangeImage = async (event) => {
        let file = event.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            let objectUrl = URL.createObjectURL(file);

            this.setState({
                // previewImgUrl: objectUrl,
                image: base64,
            });
        }
    };

    checkValidateInput = () => {
        let isValid = true;

        let arrayInput = ["name", "address", "image", "descriptionMarkdown", "descriptionHTML", "selectedProvince", "selectedDistrict",];

        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                isValid = false;

                alert("Missing Parameter: " + arrayInput[i]);

                break;
            }
        }
        return isValid;
    };

    handleChangeProvince = (selectedOption, name) => {
        if (name.name === "selectedProvince") {
            this.props.getDistrictsByProvinceIdRedux(selectedOption.value);

            this.setState({
                selectedDistrict: "",
            })
        }

        this.setState({
            [name.name]: selectedOption
        })
    }

    handleEditclinic = () => {
        if (this.checkValidateInput() === true) {
            this.props.editClinic(this.state);
        };
    };

    render() {
        let { toggleFromParent } = this.props;

        return (
            <Modal
                isOpen={this.props.isOpen}
                className="clinic-modal-container container-fluid"
                centered
            >
                <ModalHeader toggle={toggleFromParent}>
                    <div className="clinic-management-container">
                        <div className="clinic-management-title">
                            {this.props.currentClinic.key === "create"
                                ?
                                <FormattedMessage id="admin.clinic.edit-clinic-modal.add-new-title" />
                                :
                                <FormattedMessage id="admin.clinic.edit-clinic-modal.edit-title" />
                            }
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="add-new-clinic row">
                        <div className="row col-6">
                            <div className="col-6 form-group">
                                <label /><FormattedMessage id="admin.clinic.edit-clinic-modal.name" />
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.name}
                                    onChange={(event) => { this.handleOnChangeInput(event, "name") }}
                                />
                            </div>
                            <div className="col-3 form-group">
                                <label><FormattedMessage id="admin.clinic.edit-clinic-modal.province" /></label>
                                <Select
                                    value={this.state.selectedProvince}
                                    onChange={this.handleChangeProvince}
                                    options={this.state.listProvinces}
                                    name="selectedProvince"
                                    placeholder="abc"
                                />
                            </div>
                            <div className="col-3 form-group">
                                <label><FormattedMessage id="admin.clinic.edit-clinic-modal.district" /></label>
                                <Select
                                    value={this.state.selectedDistrict}
                                    onChange={this.handleChangeProvince}
                                    options={this.state.listDistricts}
                                    name="selectedDistrict"
                                    placeholder="abc"
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label><FormattedMessage id="admin.clinic.edit-clinic-modal.address" /></label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.address}
                                    onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                />
                            </div>
                        </div>

                        <div className="row col-6">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="admin.clinic.edit-clinic-modal.image" /></label>
                                <div className="preview-img-container">
                                    <input type="file" id="previewImg" hidden
                                        onChange={(event) => { this.handleOnChangeImage(event) }}
                                    />
                                    <label className="label-upload" htmlFor="previewImg"><FormattedMessage id="admin.doctor.edit-doctor-modal.upload-image" /><i className="fas fa-upload"></i></label>
                                    <div className="prev-image"
                                        style={{
                                            backgroundImage: `url(${this.state.image})`,
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row col-12">
                            <div className="col-12">
                                <MdEditor
                                    style={{ height: '400px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.descriptionMarkdown}
                                />
                            </div>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleEditclinic(); }}
                        className="px-3"
                    >
                        {this.props.currentClinic.key === "create" ?
                            <FormattedMessage id="admin.clinic.edit-clinic-modal.save" />
                            :
                            <FormattedMessage id="admin.clinic.edit-clinic-modal.confirm" />
                        }
                    </Button>
                    {""}
                    <Button
                        color="secondary" onClick={toggleFromParent}
                        className="px-3"
                    >
                        dong
                    </Button>
                </ModalFooter>
            </Modal >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        listProvinces: state.admin.allProvinces,
        listDistricts: state.admin.allDistricts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // createClinicRedux: (data) => { dispatch(actions.createClinic(data)) },
        getAllProvinceRedux: () => { dispatch(actions.getAllProvinces()) },
        getDistrictsByProvinceIdRedux: (provinceId) => { dispatch(actions.getDistrictsByProvinceId(provinceId)) },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManagement);
