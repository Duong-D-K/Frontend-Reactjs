import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { emitter } from "../../utils/emitter";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from "../../../utils";
import Select from 'react-select';
import { FormattedMessage } from "react-intl";
import Lightbox from 'react-image-lightbox';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
const mdParser = new MarkdownIt();


class EditSpecialtyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: "",

            id: "",
            nameVi: "",
            nameEn: "",
            contentMarkdown: "",
            contentHTML: "",
            image: "",
        };
    }

    async componentDidMount() {
        let specialty = this.props.currentSpecialty;

        if (specialty.key === "edit") {
            this.setState({
                actions: specialty.key,
                id: specialty.data.id,
                nameVi: specialty.data.nameVi,
                nameEn: specialty.data.nameEn,
                contentHTML: specialty.data.contentHTML,
                contentMarkdown: specialty.data.contentMarkdown,
                image: specialty.data.image
            })
        } else {
            this.setState({ actions: specialty.key, })
        }

    };

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    checkValidateInput = () => {
        let isValid = true;

        let arrayInput = ['nameVi', 'nameEn', 'contentHTML', 'contentMarkdown', "image"];

        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                isValid = false;

                alert("Missing Parameter: " + arrayInput[i]);

                break;
            }
        }
        return isValid;
    };

    handleEditSpecialty = () => {
        if (this.checkValidateInput() === true) {
            this.props.editSpecialty(this.state);
        };
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    };

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

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    render() {
        let { toggleFromParent } = this.props;
        return (
            <Modal
                isOpen={this.props.isOpen}
                className="specialty-modal-container"
                centered
            >
                <ModalHeader toggle={toggleFromParent}>
                    {this.props.currentSpecialty.key === "create" ?
                        <FormattedMessage id="admin.specialty.edit-specialty-modal.create-title" />
                        :
                        <FormattedMessage id="admin.specialty.edit-specialty-modal.edit-title" />
                    }
                </ModalHeader>
                <ModalBody>
                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <FormattedMessage id="admin.specialty.edit-specialty-modal.nameVi" />
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.nameVi}
                                onChange={(event) => { this.handleOnChangeInput(event, "nameVi") }}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <FormattedMessage id="admin.specialty.edit-specialty-modal.nameEn" />
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.nameEn}
                                onChange={(event) => { this.handleOnChangeInput(event, "nameEn") }}
                            />
                        </div>
                        <div className="col-12">
                            <label><FormattedMessage id="admin.specialty.edit-specialty-modal.image" /></label>
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
                        <div className="col-12 image">
                            <MdEditor
                                style={{ height: '400px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleEditSpecialty(); }}
                        className="px-3"
                    >
                        {this.props.currentSpecialty.key === "create" ?
                            <FormattedMessage id="admin.specialty.edit-specialty-modal.create" />
                            :
                            <FormattedMessage id="admin.specialty.edit-specialty-modal.edit" />
                        }
                    </Button>
                    {""}
                    <Button
                        color="secondary" onClick={toggleFromParent}
                        className="px-3"
                    >
                        <FormattedMessage id="admin.specialty.edit-specialty-modal.close" />
                    </Button>
                </ModalFooter>
            </Modal >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allSpecialties: state.admin.allSpecialties,
        language: state.app.language,
        allClinics: state.admin.allClinics,
        allGenders: state.admin.genders,
        allPositions: state.admin.positions,
        allPrices: state.admin.prices,
        allPayments: state.admin.payments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpecialtiesRedux: () => dispatch(actions.getAllSpecialties()),
        getAllClinicsRedux: () => dispatch(actions.getAllClinics()),
        getAllPositonsRedux: () => dispatch(actions.getAllPositions()),
        getAllGendersRedux: () => dispatch(actions.getAllGenders()),
        getAllPricesRedux: () => dispatch(actions.getAllPrices()),
        getAllPaymentsRedux: () => dispatch(actions.getAllPayments()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSpecialtyModal);
