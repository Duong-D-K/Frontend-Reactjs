// import actionTypes from "./actionTypes";

// export const adminLoginSuccess = (adminInfo) => ({
//     type: actionTypes.ADMIN_LOGIN_SUCCESS,
//     adminInfo: adminInfo,
// });

// export const adminLoginFail = () => ({
//     type: actionTypes.ADMIN_LOGIN_FAIL,
// });

// export const processLogout = () => ({
//     type: actionTypes.PROCESS_LOGOUT,
// });

import actionTypes from "./actionTypes";
import { getAllCodesSerivce } from "../../services/userService";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
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
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

