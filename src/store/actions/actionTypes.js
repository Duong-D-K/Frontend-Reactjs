const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
    SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
    CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

    //admin
    FETCH_GENDER_START: "FETCH_GENDER_START",
    FETCH_GENDER_SUCCEED: "FETCH_GENDER_SUCCEED",
    FETCH_GENDER_FAIL: "FETCH_GENDER_FAIL",

    FETCH_POSITION_SUCCEED: "FETCH_POSITION_SUCCEED",
    FETCH_POSITION_FAIL: "FETCH_POSITION_FAIL",

    FETCH_ROLE_SUCCEED: "FETCH_ROLE_SUCCEED",
    FETCH_ROLE_FAIL: "FETCH_ROLE_FAIL",

    CREATE_USER_SUCCEED: "CREATE_USER_SUCCEED",
    CREATE_USER_FAIL: "CREATE_USER_FAIL",

    UPDATE_USER_SUCCEED: "UPDATE_USER_SUCCEED",
    UPDATE_USER_FAIL: "UPDATE_USER_FAIL",

    GET_ALL_USERS_SUCCEED: "GET_ALL_USERS_SUCCEED",
    FETCH_ALL_USERS_FAIL: "FETCH_ALL_USERS_FAIL",

    DELETE_USER_SUCCEED: "DELETE_USER_SUCCEED",
    DELETE_USER_FAIL: "DELETE_USER_FAIL",

    FETCH_TOP_DOCTORS_SUCCEED: "FETCH_TOP_DOCTORS_SUCCEED",
    FETCH_TOP_DOCTORS_FAIL: "FETCH_TOP_DOCTORS_FAIL",

    FETCH_ALL_DOCTORS_SUCCEED: "FETCH_ALL_DOCTORS_SUCCEED",
    FETCH_ALL_DOCTORS_FAIL: "FETCH_ALL_DOCTORS_FAIL",


    SAVE_DOCTOR_INFO_SUCCEED: "SAVE_DOCTOR_INFO_SUCCEED",
    SAVE_DOCTOR_INFO_FAIL: "SAVE_DOCTOR_INFO_FAIL",

    GET_DOCTOR_BY_ID_SUCCEED: "GET_DOCTOR_BY_ID_SUCCEED",
    GET_DOCTOR_BY_ID_FAIL: "GET_DOCTOR_BY_ID_FAIL",

    GET_ALLCODE_SCHEDULE_TIME_SUCCEED: "GET_ALLCODE_SCHEDULE_TIME_SUCCEED",
    GET_ALLCODE_SCHEDULE_TIME_FAIL: "GET_ALLCODE_SCHEDULE_TIME_FAIL",

    CREATE_BULK_SCHEDULE_SUCCEED: "CREATE_BULK_SCHEDULE_SUCCEED",
    CREATE_BULK_SCHEDULE_FAIL: "CREATE_BULK_SCHEDULE_FAIL",

    GET_SCHEDULE_BY_DATE_SUCCEED: "GET_SCHEDULE_BY_DATE_SUCCEED",
    GET_SCHEDULE_BY_DATE_FAIL: "GET_SCHEDULE_BY_DATE_FAIL",

    //user
    ADD_USER_SUCCESS: "ADD_USER_SUCCESS",

    USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
    USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
    PROCESS_LOGOUT: "PROCESS_LOGOUT",
});

export default actionTypes;
