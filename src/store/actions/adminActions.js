import actionTypes from "./actionTypes";
import {
    getAllCodesSerivce, createNewUserService,
    getAllUsersService, deleteUserSerive,
    editUserService, getTopDoctorsService,
    getAllDoctorsService, createDoctorInfoSerivce,
    getDoctorByIdService, createBulkScheduleService,
    getScheduleByDateService, createAppointmentBookingService,
    createExaminationVerificationService,
    createSpecialtyService, getAllSpecialtiesService,
} from "../../services/userService";
import { toast } from "react-toastify";

//import gender
export const getGender = () => {
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
//import position
export const getPostion = () => {
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

            console.log("getPostion", e);
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

            console.log("getGender", e);
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

            console.log(response);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.DELETE_USER_SUCCEED,
                });

                toast.success(response.message);

                dispatch(getAllUsers());
            } else {
                dispatch({
                    type: actionTypes.DELETE_USER_FAIL,
                });

                toast.error(response.message);
            }
        } catch (e) {
            dispatch({
                type: actionTypes.DELETE_USER_FAIL,
            });

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
//fetch all doctors
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
//save doctor info
export const saveDoctorInfo = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createDoctorInfoSerivce(data);

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
//get doctor by id
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
            console.log("Fech Top Doctors Error", e);

            dispatch({
                type: actionTypes.GET_ALL_SPECIALTIES_FAIL,
                data: "",
            });
        }
    }
}