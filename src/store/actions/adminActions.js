import actionTypes from "./actionTypes";
import {
    getAllCodesSerivce, createNewUserService,
    getAllUsersService, deleteUserSerive,
    editUserService, getTopDoctorsService,
    getAllDoctorsService, saveDoctorInfoSerivce,
    getDoctorByIdService,

} from "../../services/userService";
import { toast } from "react-toastify";

//import gender
export const fetchGender = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });

            let response = await getAllCodesSerivce("gender");

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.FETCH_GENDER_SUCCEED,
                    data: response.data,
                });

            } else {
                dispatch({
                    type: actionTypes.FETCH_GENDER_FAIL,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_GENDER_FAIL,
            });

            console.log("Fetch Gender Fail", e);
        }
    }
}
//import position
export const fetchPostion = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("position");

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.FETCH_POSITION_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_POSITION_FAIL,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_POSITION_FAIL,
            });

            console.log("fetchPostion", e);
        }
    }
}
//import role
export const fetchRole = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("role");

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.FETCH_ROLE_SUCCEED,
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

            console.log("fetchGender", e);
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

                dispatch(fetchAllUsers());
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
export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUsersService("ALL");

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_USERS_SUCCEED,
                    users: response.users.reverse(),//reverse helps descending column
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_USERS_FAIL,
                });

                toast.error("Fetch Users Unsuccessfully!!");
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_USERS_FAIL,
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

                dispatch(fetchAllUsers());
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

                dispatch(fetchAllUsers());
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
export const fetchTopDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await getTopDoctorsService(10);

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            console.log("Fech Top Doctors Error", e);

            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
                data: "",
            });
        }
    }
}
//fetch all doctors
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllDoctorsService();

            if (response && response.code === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCEED,
                    data: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
                    data: "",
                });
            }
        } catch (e) {
            console.log("Fech Top Doctors Error", e);

            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
                data: "",
            });
        }
    }
}
//save doctor info
export const saveDoctorInfo = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await saveDoctorInfoSerivce(data);

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