import actionTypes from "./actionTypes";
import {
    getAllCodesSerivce, createNewUserService,
    getAllUsersService, deleteUserSerive,
    editUserService, getTopDoctorsService,
    getAllDoctorsService, saveDoctorIntroductionService,
    updateDoctorService, deleteDoctorSerive,
    getDoctorByIdService, createBulkScheduleService,
    getScheduleByDateService, createAppointmentBookingService,
    createExaminationVerificationService,

    createSpecialtyService, getAllSpecialtiesService, updateSpecialtyService, deleteSpecialtySerive,

    getAllDoctorInSpecialtyService, createClinicService,
    getAllProvincesService, getDistrictsByProvinceIdService,
    getAllClinicsService, getClinicByIdService,
    getAllPatientsByDateAndDoctorIdService,
    getAllSchedulesByDateAndDoctorIdService, sendPrescriptionService

} from "../../services/userService";

import userService from "../../services/userService";
import { toast } from "react-toastify";

export const getAllGenders = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("gender");

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_GENDER_SUCCEED,
                    data: response.data,
                });

            } else {
                dispatch({
                    type: actionTypes.GET_GENDER_FAIL,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_GENDER_FAIL,
            });

            console.log("Fetch Gender Fail", e);
        }
    }
}
export const getAllPositions = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("position");

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_POSITION_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_POSITION_FAIL,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_POSITION_FAIL,
            });

            console.log("getAllPositions", e);
        }
    }
}
export const getAllPrices = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("price");

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_PRICE_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_PRICE_FAIL,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_PRICE_FAIL,
            });

            console.log("getAllPositions", e);
        }
    }
}
export const getAllPayments = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("payment");

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_PAYMENT_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_PAYMENT_FAIL,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_PAYMENT_FAIL,
            });

            console.log("getAllPositions", e);
        }
    }
}

//import role
export const getRole = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("role");

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_ROLE_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ROLE_FAIL,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ROLE_FAIL,
            });

            console.log("Get Role Fail: ", e);
        }
    }
}
//get required doctor information
export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            let responsePrice = await getAllCodesSerivce("price");
            let responsePayment = await getAllCodesSerivce("payment");
            let responseProvince = await getAllCodesSerivce("province");

            if (responsePrice && responsePrice.code === 0 &&
                responsePayment && responsePayment.code === 0 &&
                responseProvince && responseProvince.code === 0) {
                let data = {
                    responsePrice: responsePrice.data,
                    responsePayment: responsePayment.data,
                    responseProvince: responseProvince.data,
                };

                dispatch({
                    type: actionTypes.GET_REQUIRED_DOCTOR_INFO_SUCCEED,
                    data: data,
                });

            } else {
                dispatch({
                    type: actionTypes.GET_REQUIRED_DOCTOR_INFO_FAIL,
                });
            }
        } catch (e) {
            console.log("Get Required Doctor Infomation Fail", e);
        }
    }
}
//create new user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewUserService(data);

            if (response && response.code === 0) {

                dispatch({
                    type: actionTypes.CREATE_USER_SUCCEED,
                });
                toast.success("Create User Successfully!!");

                dispatch(getAllUsers());
            } else {
                dispatch({
                    type: actionTypes.CREATE_USER_FAIL,
                });
                alert(response.message);
            }
        } catch (e) {
            dispatch({
                type: actionTypes.CREATE_USER_FAIL,
            });

            alert("Create New User Fail", e);
        }
    }
}
//fetch all users
export const getAllUsers = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUsersService();

            if (response && response.code === 0 && response.data) {
                dispatch({
                    type: actionTypes.GET_ALL_USERS_SUCCEED,
                    data: response.data.reverse(),//reverse helps descending column
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_USERS_FAIL,
                });

                toast.error("Fetch Users Unsuccessfully!!");
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALL_USERS_FAIL,
            });

            toast.error("Fetch Users Unsuccessfully!!");

            console.log("Fetch All Users Fail", e);
        }
    }
}
//update a user
export const updateUser = (data) => {
    return async (dispatch, getState) => {
        let response = await editUserService(data);
        try {
            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.UPDATE_USER_SUCCEED,
                });

                toast.success(response.message);

                dispatch(getAllUsers());
            } else {
                dispatch({
                    type: actionTypes.UPDATE_USER_FAIL,
                });

                toast.error(response.message);
            }
        } catch (e) {
            dispatch({
                type: actionTypes.UPDATE_USER_FAIL,
            });

            toast.error(response.message);

            console.log("Update User Fail", e);
        }
    }
}
//delete user
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteUserSerive(userId);

            if (response && response.code === 0) {

                toast.success(response.message);

                dispatch(getAllUsers());
            } else {
                toast.error(response.message);
            }
        } catch (e) {
            console.log("Delete User Fail", e);
        }
    }
}
//fetch top doctors
export const getTopDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await getTopDoctorsService(10);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_TOP_DOCTORS_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_TOP_DOCTORS_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            console.log("Fech Top Doctors Error", e);

            dispatch({
                type: actionTypes.GET_TOP_DOCTORS_FAIL,
                data: "",
            });
        }
    }
}

//save doctor info
export const saveDoctorIntroduction = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await saveDoctorIntroductionService(data);

            if (response && response.code === 0) {
                toast.success(response.message);

                dispatch({
                    type: actionTypes.SAVE_DOCTOR_INFO_SUCCEED,
                });
            } else {
                toast.error(response.message);

                dispatch({
                    type: actionTypes.SAVE_DOCTOR_INFO_FAIL,

                });
            }
        } catch (e) {
            toast.error("Save Doctor Info Failed!!");

            console.log("Save Doctor Error", e);

            dispatch({
                type: actionTypes.SAVE_DOCTOR_INFO_FAIL,
            });
        }
    }
}


export const getAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllDoctorsService();

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_DOCTORS_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_DOCTORS_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            console.log("Fech Top Doctors Error", e);

            dispatch({
                type: actionTypes.GET_ALL_DOCTORS_FAIL,
                data: "",
            });
        }
    }
}
export const updateDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await updateDoctorService(data);

            if (response && response.code === 0) {
                toast.success(response.message);

                dispatch(getAllDoctors());

            } else {
                toast.error(response.message);
            }
        } catch (e) {
            toast.error("Update Doctor Information Failed!!");

            console.log("Save Doctor Error", e);
        }
    }
}
export const deleteDoctor = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteDoctorSerive(doctorId);

            if (response && response.code === 0) {

                toast.success(response.message);

                dispatch(getAllDoctors());
            } else {
                toast.error(response.message);
            }
        } catch (e) {
            console.log("Delete Doctor Fail", e);
        }
    }
}
export const getDoctorById = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await getDoctorByIdService(id);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_DOCTOR_BY_ID_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_DOCTOR_BY_ID_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            toast.error("Save Doctor Info Failed!!");

            console.log("Fech Top Doctors Error", e);

            dispatch({
                type: actionTypes.GET_DOCTOR_BY_ID_FAIL,
                data: "",
            });
        }
    }
}


//get allcode schedule hours
export const getAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("TIME");

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            console.log("Fech Top Doctors Error", e);

            dispatch({
                type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAIL,
                data: "",
            });
        }
    }
}
//create bulk schedule
export const createBulkSchedule = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createBulkScheduleService(data);

            if (response && response.code === 0) {

                dispatch({
                    type: actionTypes.CREATE_BULK_SCHEDULE_SUCCEED,
                });
                toast.success(response.message);

                dispatch(getAllScheduleTime());
            } else {
                dispatch({
                    type: actionTypes.CREATE_BULK_SCHEDULE_FAIL,
                });
                alert(response.message);
            }
        } catch (e) {
            dispatch({
                type: actionTypes.CREATE_BULK_SCHEDULE_FAIL,
            });

            alert("Create New User Fail", e);
        }
    }
}
//get schedule by date
export const getScheduleByDate = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            let response = await getScheduleByDateService(doctorId, date);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_SCHEDULE_BY_DATE_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_SCHEDULE_BY_DATE_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            alert("Get Schedule By Date Failed!!");

            dispatch({
                type: actionTypes.GET_SCHEDULE_BY_DATE_FAIL,
                data: "",
            });
        }
    }
}

export const saveAppointmentBooking = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createAppointmentBookingService(data);

            if (response && response.code === 0) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (e) {
            toast.error("Save Doctor Info Failed!!");

            console.log("Save Doctor Error", e);
        }
    }
}

export const saveExaminationVerification = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createExaminationVerificationService(data);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.SAVE_EXAMINATION_VERIFICATION_SUCCEED,
                    data: { code: response.code, message: response.message },
                });
            } else {
                dispatch({
                    type: actionTypes.SAVE_EXAMINATION_VERIFICATION_FAIL,
                    data: { code: response.code, message: response.message },
                });
            }
        } catch (e) {
            toast.error("Save Doctor Info Failed!!");

            console.log("Save Doctor Error", e);

            dispatch({
                type: actionTypes.SAVE_EXAMINATION_VERIFICATION_FAIL,
            });
        }
    }
}


export const createSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createSpecialtyService(data);

            if (response && response.code === 0) {
                toast.success(response.message);

                dispatch(getAllSpecialties());
            } else {
                toast.error(response.message);
            }
        } catch (e) {
            toast.error("Create New Specialty Failed!!");

            console.log("Failed!", e);
        }
    }
}
export const getAllSpecialties = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllSpecialtiesService();

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_SPECIALTIES_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_SPECIALTIES_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            console.log("Get All Specialty Error", e);

            dispatch({
                type: actionTypes.GET_ALL_SPECIALTIES_FAIL,
                data: "",
            });
        }
    }
}
export const updateSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await updateSpecialtyService(data);

            if (response && response.code === 0) {
                toast.success(response.message);

                dispatch(getAllSpecialties());

            } else {
                toast.error(response.message);
            }
        } catch (e) {
            toast.error("Update Specialty Information Failed!!");

            console.log("Update Specialty Error", e);
        }
    }
}
export const deleteSpecialty = (specialtyId) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteSpecialtySerive(specialtyId);

            if (response && response.code === 0) {

                toast.success(response.message);

                dispatch(getAllSpecialties());
            } else {
                toast.error(response.message);
            }
        } catch (e) {
            console.log("Delete Specialty Fail", e);
        }
    }
}


export const getAllDoctorInSpecialty = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllDoctorInSpecialtyService(id);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_DOCTORS_IN_SPECIALTY_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_DOCTORS_IN_SPECIALTY_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            toast.error("Get All Doctors In Specialty Failed!!");

            console.log("Fech Top Doctors Error", e);

            dispatch({
                type: actionTypes.GET_ALL_DOCTORS_IN_SPECIALTY_FAIL,
                data: "",
            });
        }
    }
}


export const createClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createClinicService(data);

            if (response && response.code === 0) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (e) {
            toast.error("Create New Specialty Failed!!");

            console.log("Failed!", e);
        }
    }
}

export const getAllProvinces = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllProvincesService();

            if (response && response.code === 0 && response.data) {
                dispatch({
                    type: actionTypes.GET_ALL_PROVINCES_SUCCEED,
                    data: response.data.reverse(),//reverse helps descending column
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_SPECIALTIES_FAIL,
                });

                toast.error("Get All Provinces Unsuccessfully!!");
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALL_SPECIALTIES_FAIL,
            });

            toast.error("Get All Provinces Unsuccessfully!!");

            console.log("Get All Provinces Fail", e);
        }
    }
}

export const getDistrictsByProvinceId = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await getDistrictsByProvinceIdService(id);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_DISTRICT_BY_PROVINCEID_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_DISTRICT_BY_PROVINCEID_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            toast.error("Get District By Province Failed!!");

            console.log("Get District By Province Error", e);

            dispatch({
                type: actionTypes.GET_DISTRICT_BY_PROVINCEID_FAIL,
                data: "",
            });
        }
    }
}

export const getAllClinics = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllClinicsService();

            if (response && response.code === 0 && response.data) {
                dispatch({
                    type: actionTypes.GET_ALL_CLINICS_SUCCEED,
                    data: response.data.reverse(),//reverse helps descending column
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_CLINICS_FAIL,
                });

                toast.error("Get All Clinics Unsuccessfully!!");
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALL_CLINICS_FAIL,
            });

            toast.error("Get All Clinics Unsuccessfully!!");

            console.log("Get All Clinics Fail", e);
        }
    }
}

export const getClinicById = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await getClinicByIdService(id);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_CLINIC_BY_ID_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_CLINIC_BY_ID_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            toast.error("Get Clinic By Id Failed!!");

            console.log("Get Clinic By Id Error", e);

            dispatch({
                type: actionTypes.GET_CLINIC_BY_ID_FAIL,
                data: "",
            });
        }
    }
}

//get all patients by date and doctorId
export const getAllPatientsByDateAndDoctorId = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllPatientsByDateAndDoctorIdService(doctorId, date);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_PATIENTS_BY_DATE_AND_DOCTORID_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_PATIENTS_BY_DATE_AND_DOCTORID_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            alert("Get Patients By Date And DoctorId Failed!!");

            console.log(e);

            dispatch({
                type: actionTypes.GET_ALL_PATIENTS_BY_DATE_AND_DOCTORID_FAIL,
                data: "",
            });
        }
    }
}

//get all patients by date and doctorId
export const getAllSchedulesByDateAndDoctorId = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllSchedulesByDateAndDoctorIdService(doctorId, date);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_SCHEDULES_BY_DATE_AND_DOCTORID_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_SCHEDULES_BY_DATE_AND_DOCTORID_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            alert("Get Schedules By Date And DoctorId Failed!!");

            console.log(e);

            dispatch({
                type: actionTypes.GET_ALL_SCHEDULES_BY_DATE_AND_DOCTORID_FAIL,
                data: "",
            });
        }
    }
}

export const sendPrescription = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await sendPrescriptionService(data);

            if (response && response.code === 0) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (e) {
            toast.error("Create New Specialty Failed!!");

            console.log("Failed!", e);
        }
    }
}
