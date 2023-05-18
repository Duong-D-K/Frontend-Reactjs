import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("api/login", {
        email: userEmail,
        password: userPassword,
    });
};

const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-All-Users?id=${inputId}`);
};

const createNewUserService = (data) => {
    return axios.post(`api/create-New-User`, data);
}

const deleteUserSerive = (id) => {
    return axios.delete(`/api/delete-User`, {
        data: { id: id }
    });
}
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserSerive };
