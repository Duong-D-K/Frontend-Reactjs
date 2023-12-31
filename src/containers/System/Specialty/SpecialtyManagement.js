import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils } from "../../../utils";
import "./SpecialtyManagement.scss";
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt();

class SpecialtyManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            contentMarkdown: "",
            contentHTML: "",
        };
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handeOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                imageBase64: base64,
                avatar: base64,
            });
        }
    }

    handleSaveSpecialty = () => {
        this.props.createSpecialtyRedux(this.state);
    }
    render() {
        return (
            <>
                <div className="specialty-management-container">
                    <div className="specialty-management-title">
                        Quản Lý Chuyên Khoa
                    </div>
                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label />Tên Chuyên Khoa
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.name}
                                onChange={(event) => { this.handeOnchangeInput(event, "name") }}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Ảnh Chuyên Khoa</label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) => { this.handleOnChangeImage(event) }}
                            />
                        </div>
                        <div className="col-12">
                            <MdEditor
                                style={{ height: '400px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-save-specialty"
                                onClick={() => this.handleSaveSpecialty()}
                            >Save</button>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createSpecialtyRedux: (data) => { dispatch(actions.createSpecialty(data)) },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManagement);
