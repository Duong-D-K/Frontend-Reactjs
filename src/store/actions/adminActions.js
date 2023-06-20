import actionTypes from "./actionTypes";
import {
    getAllCodesSerivce, createNewUserService,
    getAllUsersService, deleteUserSerive,
    editUserService, getTopDoctorsService,
    getAllDoctorsService, saveDoctorInfoSerivce,

} from "../../services/userService";
import { toast } from "react-toastify";

//import gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });

            let response = await getAllCodesSerivce("gender");

            if (response && response.code === 0) {
                dispatch(fetchGenderSucceed(response.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());

            console.log("Fetch Gender Fail", e);
        }
    }
}
export const fetchGenderSucceed = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCEED,
    data: genderData,
});
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL,
});
//import position
export const fetchPostionStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("position");

            if (response && response.code === 0) {
                dispatch(fetchpPositionSucceed(response.data));
            } else {
                dispatch(fetchPostionFail());
            }
        } catch (e) {
            dispatch(fetchPostionFail());

            console.log("fetchPostionStart", e);
        }
    }
}
export const fetchpPositionSucceed = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCEED,
    data: positionData,
});
export const fetchPostionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
});
//import role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("role");

            if (response && response.code === 0) {
                dispatch(fetchpRoleSucceed(response.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (e) {
            dispatch(fetchRoleFail());

            console.log("fetchGenderStart", e);
        }
    }
}
export const fetchpRoleSucceed = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCEED,
    data: roleData,
});
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
});
//create new user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewUserService(data);

            if (response && response.code === 0) {

                dispatch(createNewUserSucceed());
                toast.success("Create User Successfully!!");

                dispatch(fetchAllUsersStart());
            } else {
                dispatch(createNewUserFail());
                alert(response.message);
            }
        } catch (e) {
            dispatch(createNewUserFail());

            alert("Create New User Fail", e);
        }
    }
}
export const createNewUserSucceed = () => ({
    type: actionTypes.CREATE_USER_SUCCEED,
});
export const createNewUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
})
//fetch all users
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUsersService("ALL");

            if (response && response.code === 0) {
                dispatch(fetchAllUsersSucceed(response.users.reverse()));//reverse helps descending column
            } else {
                dispatch(fetchAllUsersFail());

                toast.error("Fetch Users Unsuccessfully!!");
            }
        } catch (e) {
            dispatch(fetchAllUsersFail());

            toast.error("Fetch Users Unsuccessfully!!");

            console.log("Fetch All Users Fail", e);
        }
    }
}
export const fetchAllUsersSucceed = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCEED,
    users: data,
})
export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERSFAIL,

})
//update a user
export const updateUserStart = (data) => {
    return async (dispatch, getState) => {
        let response = await editUserService(data);
        try {
            if (response && response.code === 0) {
                dispatch(updateUserSucceed());

                toast.success(response.message);

                dispatch(fetchAllUsersStart());
            } else {
                dispatch(updateUserFail());

                toast.error(response.message);
            }
        } catch (e) {
            dispatch(updateUserFail());

            toast.error(response.message);

            console.log("Update User Fail", e);
        }
    }
}
export const updateUserSucceed = () => ({
    type: actionTypes.UPDATE_USER_SUCCEED,
})
export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAIL,
})
//delete user
export const deleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteUserSerive(userId);

            console.log(response);

            if (response && response.code === 0) {
                dispatch(deleteUserSucceed());

                toast.success(response.message);

                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFail());

                toast.error(response.message);
            }
        } catch (e) {
            dispatch(deleteUserFail());

            console.log("Delete User Fail", e);
        }
    }
}
export const deleteUserSucceed = (data) => ({
    type: actionTypes.DELETE_USERS_SUCCEED,
})
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USERS_FAIL,
})
//fetch top doctors
export const fetchTopDoctorsStart = (data) => {
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
                toast.success("Save Doctor Info Successfully!!");

                dispatch({
                    type: actionTypes.SAVE_DOCTOR_INFO_SUCCEED,
                });
            } else {
                toast.error("Save Doctor Info Failed!!");

                dispatch({
                    type: actionTypes.SAVE_DOCTOR_INFO_FAIL,

                });
            }
        } catch (e) {
            toast.error("Save Doctor Info Failed!!");

            console.log("Fech Top Doctors Error", e);

            dispatch({
                type: actionTypes.SAVE_DOCTOR_INFO_FAIL,
            });
        }
    }
}