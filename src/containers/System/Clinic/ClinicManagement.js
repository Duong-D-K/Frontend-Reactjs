import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils } from "../../../utils";
import "./ClinicManagement.scss";
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
            name: "",
            address: "",
            imageBase64: "",
            descriptionMarkdown: "",
            descriptionHTML: "",

            listProvinces: "",
            listDistricts: "",

            selectedProvince: "",
            selectedDistrict: "",
        };
    }
    async componentDidMount() {
        await this.props.getAllProvinceRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                listProvinces: this.buildDataReactSelect(this.props.listProvinces),
                listDistricts: this.buildDataReactSelect(this.props.listDistricts)
            })
        }

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
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                imageBase64: base64,
            });
        }
    }

    handleCreateClinic = () => {
        this.props.createClinicRedux({
            name: this.state.name,
            imageBase64: this.state.imageBase64,
            address: this.state.address,
            districtId: this.state.selectedDistrict.value,
            provinceId: this.state.selectedProvince.value,
            descriptionMarkdown: this.state.descriptionMarkdown,
            descriptionHTML: this.state.descriptionHTML,
        });

        this.setState({
            name: "",
            image: "",
            address: "",
            selectedDistrict: "",
            selectedProvince: "",
            descriptionMarkdown: "",
            descriptionHTML: "",
        })
    }

    handleChange = (selectedOption, name) => {
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

    render() {
        return (
            <>
                <div className="specialty-management-container">
                    <div className="specialty-management-title">
                        Quản Lý Cơ Sở Khám Chữa Bệnh
                    </div>
                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label />Tên Cơ Sở Khám Chữa Bệnh
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.name}
                                onChange={(event) => { this.handleOnChangeInput(event, "name") }}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Ảnh Cơ Sở Khám Chữa Bệnh</label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) => { this.handleOnChangeImage(event) }}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Dia chi Cơ Sở Khám Chữa Bệnh</label>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.address}
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                            />
                        </div>
                        <div className="col-3 form-group">
                            <label>Tinh Thanh</label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChange}
                                options={this.state.listProvinces}
                                name="selectedProvince"
                                placeholder="abc"
                            />
                        </div>
                        <div className="col-3 form-group">
                            <label>Quan/ Huyen / Thi xa</label>
                            <Select
                                value={this.state.selectedDistrict}
                                onChange={this.handleChange}
                                options={this.state.listDistricts}
                                name="selectedDistrict"
                                placeholder="abc"
                            />
                        </div>
                        <div className="col-12">
                            <MdEditor
                                style={{ height: '400px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-save-specialty"
                                onClick={() => this.handleCreateClinic()}
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
        language: state.app.language,
        listProvinces: state.admin.allProvinces,
        listDistricts: state.admin.allDistricts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createClinicRedux: (data) => { dispatch(actions.createClinic(data)) },
        getAllProvinceRedux: () => { dispatch(actions.getAllProvinces()) },
        getDistrictsByProvinceIdRedux: (provinceId) => { dispatch(actions.getDistrictsByProvinceId(provinceId)) },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManagement);
