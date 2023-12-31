import actionTypes from "../actions/actionTypes";

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    doctor: [],
    allScheduleTime: [],
    schedule: [],
    examination_verification: {},

    allRequiredDoctorInfo: [],

};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //gender
        case actionTypes.GET_GENDER_SUCCEED:
            return {
                ...state,
                genders: action.data,
                // isLoadingGender: false,
            };
        case actionTypes.GET_GENDER_FAIL:
            return {
                ...state,
                genders: [],
                // isLoadingGender: false,
            };
        //postion
        case actionTypes.GET_POSITION_SUCCEED:
            return {
                ...state,
                positions: action.data,
            };
        case actionTypes.GET_POSITION_FAIL:
            return {
                ...state,
                positions: [],
            };
        //role
        case actionTypes.GET_ROLE_SUCCEED:
            return {
                ...state,
                roles: action.data,
            };
        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state,
                roles: [],
            };
        //fetch all users
        case actionTypes.GET_ALL_USERS_SUCCEED:
            return {
                ...state,
                users: action.data,
            };
        case actionTypes.GET_ALL_USERS_FAIL:
            return {
                ...state,
                users: [],
            };
        //fetch top doctors
        case actionTypes.GET_TOP_DOCTORS_SUCCEED:
            return {
                ...state,
                topDoctors: action.data,
            };
        case actionTypes.GET_TOP_DOCTORS_FAIL:
            return {
                ...state,
                topDoctors: [],
            };
        //get all doctors
        case actionTypes.GET_ALL_DOCTORS_SUCCEED:
            return {
                ...state,
                allDoctors: action.data,
            };
        case actionTypes.GET_ALL_DOCTORS_FAIL:
            return {
                ...state,
                allDoctors: [],
            };
        //get doctor by id
        case actionTypes.GET_DOCTOR_BY_ID_SUCCEED:
            return {
                ...state,
                doctor: action.data,
            };
        case actionTypes.GET_DOCTOR_BY_ID_FAIL:
            return {
                ...state,
                doctor: "",
            };
        //get allcode schedule time
        case actionTypes.GET_ALLCODE_SCHEDULE_TIME_SUCCEED:
            return {
                ...state,
                allScheduleTime: action.data,
            };
        case actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAIL:
            return {
                ...state,
                allScheduleTime: "",
            };
        //get schedule by date
        case actionTypes.GET_SCHEDULE_BY_DATE_SUCCEED:
            return {
                ...state,
                schedule: action.data,
            };
        case actionTypes.GET_SCHEDULE_BY_DATE_FAIL:
            return {
                ...state,
                schedule: "",
            };

        case actionTypes.GET_REQUIRED_DOCTOR_INFO_SUCCEED:
            return {
                ...state,
                allRequiredDoctorInfo: action.data,
            };
        case actionTypes.GET_REQUIRED_DOCTOR_INFO_FAIL:
            return {
                ...state,
                allRequiredDoctorInfo: "",
            };

        case actionTypes.SAVE_EXAMINATION_VERIFICATION_SUCCEED:
            return {
                ...state,
                examination_verification: action.data,
            };
        case actionTypes.SAVE_EXAMINATION_VERIFICATION_FAIL:
            return {
                ...state,
                examination_verification: action.data,
            };
        default:
            return state;
    }
};

export default adminReducer;
