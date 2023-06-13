import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);//convert from html to text

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: "",
            description: "",
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown = () => {
        console.log(this.state);
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
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
                            options={options}
                        />
                    </div>
                    <div className="content-right">
                        <label>Thông Tin Giới Thiệu</label>
                        <textarea
                            className="form-control" rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                            fdsfdsfdsfds
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
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserStartRedux: (id) => { dispatch(actions.deleteUserStart(id)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
