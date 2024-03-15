import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils } from "../../../utils";
import "./SpecialtyManagement.scss";
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import EditSpecialtyModal from "./EditSpecialtyModal";
import _ from "lodash";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt();

class SpecialtyManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: "",
            openEditSpecialtyModal: false,
            // openCreateSpecialtyModal: false,

            specialtyEdit: {}
        };
    }
    async componentDidMount() {
        await this.props.getAllSpecialtiesRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allSpecialties !== prevProps.allSpecialties) {
            this.setState({
                listSpecialty: this.props.allSpecialties,
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    toggleEditSpecialtyModal = () => {
        this.setState({
            openEditSpecialtyModal: !this.state.openEditSpecialtyModal,
        })
    }

    editSpecialty = async (specialty) => {
        try {
            if (specialty.actions === "edit") {
                this.props.updateSpecialtyrRedux({
                    id: specialty.id,
                    nameVi: specialty.nameVi,
                    nameEn: specialty.nameEn,
                    contentHTML: specialty.contentHTML,
                    contentMarkdown: specialty.contentMarkdown,
                    image: specialty.image,
                });

                this.setState({ openEditSpecialtyModal: false });
            }
            else if (specialty.actions === "create") {
                this.props.createSpecialtyRedux({
                    nameVi: specialty.nameVi,
                    nameEn: specialty.nameEn,
                    contentHTML: specialty.contentHTML,
                    contentMarkdown: specialty.contentMarkdown,
                    image: specialty.image,
                });

                this.setState({ openEditSpecialtyModal: false });
            }
        } catch (e) {
            console.log(e);
        }
    }

    deleteSpecialty = async (specialty) => {
        try {
            await this.props.deleteSpecialtyRedux(specialty.id);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let { listSpecialty } = this.state;

        return (
            <>
                <div className="specialty-management container-fluid">
                    {this.state.openEditSpecialtyModal &&
                        <EditSpecialtyModal
                            isOpen={this.state.openEditSpecialtyModal}
                            toggleFromParent={this.toggleEditSpecialtyModal}
                            currentSpecialty={this.state.specialtyEdit}
                            editSpecialty={this.editSpecialty}
                        />
                    }
                    <div className="specialty-management-title">
                        <FormattedMessage id="admin.specialty.specialty-management.title" />
                    </div>
                    <div className="mx-1">
                        <button
                            className="btn btn-primary px-3"
                            onClick={() => this.setState({ openEditSpecialtyModal: true, specialtyEdit: { key: "create", data: "" }, })}
                        >
                            <i className="fas fa-plus"></i><FormattedMessage id="admin.specialty.specialty-management.add-new" />
                        </button>
                    </div>
                    <div className="user-table mt-4 mx-1">
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id="admin.specialty.specialty-management.ordinal" /></th>
                                    <th><FormattedMessage id="admin.specialty.specialty-management.name" /></th>
                                    <th><FormattedMessage id="admin.specialty.specialty-management.contentHTML" /></th>
                                    <th><FormattedMessage id="admin.specialty.specialty-management.contentMarkdown" /></th>
                                    <th><FormattedMessage id="admin.specialty.specialty-management.image" /></th>
                                    <th><FormattedMessage id="admin.specialty.specialty-management.action" /></th>
                                </tr>
                                {listSpecialty ? listSpecialty.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn}</td>
                                            <td>{item.contentHTML && item.contentHTML.substring(0, 60)}.....</td>
                                            <td>{item.contentMarkdown && item.contentMarkdown.substring(0, 60)}.....</td>
                                            <td>
                                                <div className="preview-img-container">
                                                    <div className="prev-image"
                                                        style={{
                                                            backgroundImage: `url(${item.image})`,
                                                            height: "40px",
                                                            backgroundSize: "auto 40px",
                                                            backgroundPosition: "center",
                                                            backgroundRepeat: "no-repeat",
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
                                                            openEditSpecialtyModal: true,
                                                            specialtyEdit: {
                                                                key: "edit",
                                                                data: item,
                                                            },
                                                        })
                                                    }}><FormattedMessage id="admin.specialty.specialty-management.edit" />
                                                </button>
                                                <button className="btn-delete" onClick={() => this.deleteSpecialty(item)}><FormattedMessage id="admin.specialty.specialty-management.delete" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }) : <></>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allSpecialties: state.admin.allSpecialties,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpecialtiesRedux: () => dispatch(actions.getAllSpecialties()),
        updateSpecialtyrRedux: (data) => { dispatch(actions.updateSpecialty(data)) },
        createSpecialtyRedux: (data) => { dispatch(actions.createSpecialty(data)) },
        deleteSpecialtyRedux: (specialtyId) => { dispatch(actions.deleteSpecialty(specialtyId)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManagement);
