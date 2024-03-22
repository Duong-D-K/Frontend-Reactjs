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



const saveDoctorIntroductionService = (data) => {
    return axios.post(`/api/save-doctor-introduction`, data);
}


const getDoctorByIdService = (id) => {
    return axios.get(`/api/get-doctor-by-id?id=${id}`);
}
const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
}
const updateDoctorService = (data) => {
    return axios.put(`/api/update-doctor`, data);
}
const createDoctorService = (data) => {
    return axios.post(`/api/create-doctor`, data);
}
const deleteDoctorSerive = (doctorId) => {
    return axios.delete(`/api/delete-doctor/${doctorId}`);
}
const getAllDoctorsBySpecialtyIdService = (data) => {
    return axios.get(`/api/get-all-doctors-by-specialtyId?id=${data.id}&location=${data.location}`);
}
const getAllDoctorsByClinicIdService = (clinicId) => {
    return axios.get(`/api/get-all-doctors-by-clinicId?clinicId=${clinicId}`);
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
const updateSpecialtyService = (data) => {
    return axios.put(`/api/update-specialty`, data);
}
const deleteSpecialtySerive = (specialtyId) => {
    return axios.delete(`/api/delete-specialty/${specialtyId}`);
}
const getSpecialtyByIdService = (id) => {
    return axios.get(`/api/get-specialty-by-id?id=${id}`);
}





const getAllProvincesService = () => {
    return axios.get(`/api/get-All-Provinces`);
}
const getDistrictsByProvinceIdService = (provinceId) => {
    return axios.get(`/api/get-District-By-ProvinceId?provinceId=${provinceId}`);
}



const createClinicService = (data) => {
    return axios.post(`/api/create-clinic`, data);
}
const getAllClinicsService = () => {
    return axios.get(`/api/get-all-clinics`);
}
const getClinicByIdService = (id) => {
    return axios.get(`/api/get-clinic-by-id?id=${id}`);
}
const updateClinicService = (data) => {
    return axios.put(`/api/update-clinic`, data);
}
const deleteClinicSerive = (clinicId) => {
    return axios.delete(`/api/delete-clinic/${clinicId}`);
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
    saveDoctorIntroductionService,

    createDoctorService,
    updateDoctorService,
    deleteDoctorSerive,
    getDoctorByIdService,
    getAllDoctorsBySpecialtyIdService,
    getAllDoctorsByClinicIdService,
    getScheduleByDateService,



    getDoctorInformationById,


    createAppointmentBookingService,
    createExaminationVerificationService,


    getAllSpecialtiesService,
    getSpecialtyByIdService,
    createSpecialtyService,
    updateSpecialtyService,
    deleteSpecialtySerive,


    getAllClinicsService,
    createClinicService,
    updateClinicService,
    getClinicByIdService,
    deleteClinicSerive,

    getAllProvincesService,
    getDistrictsByProvinceIdService,


    getAllPatientsByDateAndDoctorIdService,
    getAllSchedulesByDateAndDoctorIdService,


    createBulkScheduleService,


    sendPrescriptionService,
};
