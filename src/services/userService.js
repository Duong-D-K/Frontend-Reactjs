import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("api/login", {
        email: userEmail,
        password: userPassword,
    });
};

const getAllUsersService = () => {
    return axios.get(`/api/get-All-Users`);
};

const createNewUserService = (data) => {
    return axios.post(`api/create-New-User`, data);
}

const deleteUserSerive = (userId) => {
    return axios.delete(`/api/delete-User/${userId}`);
}

const editUserService = (data) => {
    return axios.put(`/api/edit-User`, data);
}

const getAllCodesSerivce = (inputType) => {
    return axios.get(`/api/allcodes?type=${inputType}`);
}

const getTopDoctorsService = (limit) => {
    return axios.get(`/api/top-doctors-home?limit=${limit}`);
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
}

const createDoctorInfoSerivce = (data) => {
    return axios.post(`/api/save-doctor-info`, data);
}

const getDoctorByIdService = (id) => {
    return axios.get(`/api/get-doctor-by-id?id=${id}`);
}

const createBulkScheduleService = (data) => {
    return axios.post("/api/bulk-create-schedule", data);
}

const getScheduleByDateService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
}

const getDoctorInformationById = (doctorId) => {
    return axios.get(`/api/get-doctor-infomation-by-id?doctorId=${doctorId}`);
}

const createAppointmentBookingService = (data) => {
    return axios.post(`/api/appointment-booking`, data);
}

const createExaminationVerificationService = (data) => {
    return axios.post(`/api/examination-verification`, data);
}

const createSpecialtyService = (data) => {
    return axios.post(`/api/create-specialty`, data);
}

const getAllSpecialtiesService = () => {
    return axios.get(`/api/get-all-specialties`);
};

const getAllDoctorInSpecialtyService = (data) => {
    return axios.get(`/api/get-all-doctors-in-specialty?id=${data.id}&location=${data.location}`);
}

const createClinicService = (data) => {
    return axios.post(`/api/create-clinic`, data);
}

const getAllProvincesService = () => {
    return axios.get(`/api/get-All-Provinces`);
}

const getDistrictsByProvinceIdService = (provinceId) => {
    return axios.get(`/api/get-District-By-ProvinceId?provinceId=${provinceId}`);
}

const getAllClinicsService = () => {
    return axios.get(`/api/get-all-clinics`);
}

const getClinicByIdService = (id) => {
    return axios.get(`/api/get-clinic-by-id?id=${id}`);
}

const getAllPatientsByDateAndDoctorIdService = (doctorId, date) => {
    return axios.get(`/api/get-all-patients-by-date-and-doctorId?doctorId=${doctorId}&date=${date}`);
}

const getAllSchedulesByDateAndDoctorIdService = (doctorId, date) => {
    return axios.get(`/api/get-all-schedules-by-date-and-doctorId?doctorId=${doctorId}&date=${date}`);
}

const sendPrescriptionService = (data) => {
    return axios.post(`/api/send-prescription`, data);
}
export {
    handleLoginApi,

    getAllUsersService,
    createNewUserService,
    deleteUserSerive,
    editUserService,
    getAllCodesSerivce,
    getTopDoctorsService,
    getAllDoctorsService,
    createDoctorInfoSerivce,
    getDoctorByIdService,
    getScheduleByDateService,
    getDoctorInformationById,
    createAppointmentBookingService,
    createExaminationVerificationService,
    createSpecialtyService,
    getAllSpecialtiesService,
    getAllDoctorInSpecialtyService,

    createClinicService,
    getAllProvincesService,

    getDistrictsByProvinceIdService,
    getAllClinicsService,
    getClinicByIdService,
    getAllPatientsByDateAndDoctorIdService,
    getAllSchedulesByDateAndDoctorIdService,

    createBulkScheduleService,

    sendPrescriptionService,
};
