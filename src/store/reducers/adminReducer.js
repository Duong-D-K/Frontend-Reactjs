import actionTypes from "../actions/actionTypes";

const initialState = {
    // isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    doctor: [],

};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //gender
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                // isLoadingGender: true,
            };
        case actionTypes.FETCH_GENDER_SUCCEED:
            return {
                ...state,
                genders: action.data,
                // isLoadingGender: false,
            };
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
                genders: [],
                // isLoadingGender: false,
            };
        //postion
        case actionTypes.FETCH_POSITION_SUCCEED:
            return {
                ...state,
                positions: action.data,
            };
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
                positions: [],
            };
        //role
        case actionTypes.FETCH_ROLE_SUCCEED:
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
        case actionTypes.FETCH_ALL_USERS_SUCCEED:
            return {
                ...state,
                users: action.users,
            };
        case actionTypes.FETCH_ALL_USERS_FAIL:
            return {
                ...state,
                users: [],
            };
        //fetch top doctors
        case actionTypes.FETCH_TOP_DOCTORS_SUCCEED:
            return {
                ...state,
                topDoctors: action.data,
            };
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
            return {
                ...state,
                topDoctors: [],
            };
        //fetch all doctors
        case actionTypes.FETCH_ALL_DOCTORS_SUCCEED:
            return {
                ...state,
                allDoctors: action.data,
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAIL:
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


        default:
            return state;
    }
};

export default adminReducer;
