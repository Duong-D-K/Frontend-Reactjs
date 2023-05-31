import actionTypes from "./actionTypes";
import { getAllCodesSerivce, createNewUserService } from "../../services/userService";
//import gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });

            let response = await getAllCodesSerivce("gender");

            if (response && response.errCode === 0) {
                dispatch(fetchGenderSuccess(response.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());

            console.log("fetchGenderStart", e);
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCEED,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIL,
});
//import position
export const fetchPostionStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("position");

            if (response && response.errCode === 0) {
                dispatch(fetchpPositionSuccess(response.data));
            } else {
                dispatch(fetchPostionFailed());
            }
        } catch (e) {
            dispatch(fetchPostionFailed());

            console.log("fetchPostionStart", e);
        }
    }
}
export const fetchpPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCEED,
    data: positionData,
});
export const fetchPostionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
});
//import role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodesSerivce("role");

            if (response && response.errCode === 0) {
                dispatch(fetchpRoleSuccess(response.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());

            console.log("fetchGenderStart", e);
        }
    }
}
export const fetchpRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCEED,
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
});
//check validate
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewUserService(data);

            console.log("check", response);

            if (response && response.errCode === 0) {
                dispatch(createNewUserSucceed());
            } else {
                dispatch(createNewUserFailed());
            }
        } catch (e) {
            dispatch(createNewUserFailed());

            console.log("Create New User Failed", e);
        }
    }
}
export const createNewUserSucceed = () => ({
    type: actionTypes.CREATE_USER_SUCCEED,
});

export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAIL,
})