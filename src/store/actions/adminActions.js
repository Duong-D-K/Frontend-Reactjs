import actionTypes from "./actionTypes";
import {
    getAllCodesSerivce, createNewUserService,
    getAllUsersService, deleteUserSerive,

} from "../../services/userService";
import { toast } from "react-toastify";

//import gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });

            let response = await getAllCodesSerivce("gender");

            if (response && response.errCode === 0) {
                dispatch(fetchGenderSucceed(response.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());

            console.log("fetchGenderStart", e);
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

            if (response && response.errCode === 0) {
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

            if (response && response.errCode === 0) {
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

            if (response && response.errCode === 0) {

                dispatch(createNewUserSucceed());
                toast.success("Create User Successfully!!");

                dispatch(fetchAllUsersStart());
            } else {
                dispatch(createNewUserFail());
                alert(response.errMessage);
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

            if (response && response.errCode === 0) {
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
//delete user
export const deleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteUserSerive(userId);

            if (response && response.errCode === 0) {
                dispatch(deleteUserSucceed());

                toast.success("Delete User Successfully!!");

                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFail());

                toast.error("Delete User Unsuccessfully!!");
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