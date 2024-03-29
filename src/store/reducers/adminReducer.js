import actionTypes from "../actions/actionTypes";

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    prices: [],
    payments: [],

    users: [],
    topDoctors: [],
    allDoctors: [],
    doctor: [],
    specialty: [],


    allScheduleTime: [],
    schedule: [],
    allSpecialties: [],
    examination_verification: {},
    allDoctorsBySpecialtyId: [],
    allDoctorsByClinicId: [],

    allSchedulesByDateAndDoctor: [],

    allProvinces: [],
    allDistricts: [],
    allClinics: [],
    allPatients: [],

    clinic: [],
    allRequiredDoctorInfo: [],

};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

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

        case actionTypes.GET_PRICE_SUCCEED:
            return {
                ...state,
                prices: action.data,
            };
        case actionTypes.GET_PRICE_FAIL:
            return {
                ...state,
                prices: [],
            };

        case actionTypes.GET_PAYMENT_SUCCEED:
            return {
                ...state,
                payments: action.data,
            };
        case actionTypes.GET_PAYMENT_FAIL:
            return {
                ...state,
                payments: [],
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

        case actionTypes.GET_ALL_SPECIALTIES_SUCCEED:
            return {
                ...state,
                allSpecialties: action.data,
            };
        case actionTypes.GET_ALL_SPECIALTIES_FAIL:
            return {
                ...state,
                allSpecialties: [],
            };

        case actionTypes.GET_ALL_DOCTORS_BY_SPECIALTYID_SUCCEED:
            return {
                ...state,
                allDoctorsBySpecialtyId: action.data,
            };
        case actionTypes.GET_ALL_DOCTORS_BY_SPECIALTYID_FAIL:
            return {
                ...state,
                allDoctorsBySpecialtyId: [],
            };

        case actionTypes.GET_ALL_DOCTORS_BY_CLINICID_SUCCEED:
            return {
                ...state,
                allDoctorsByClinicId: action.data,
            };
        case actionTypes.GET_ALL_DOCTORS_BY_CLINICID_FAIL:
            return {
                ...state,
                allDoctorsByClinicId: [],
            };


        case actionTypes.GET_ALL_PROVINCES_SUCCEED:
            return {
                ...state,
                allProvinces: action.data,
            };
        case actionTypes.GET_ALL_PROVINCES_FAIL:
            return {
                ...state,
                allProvinces: [],
            };

        case actionTypes.GET_DISTRICT_BY_PROVINCEID_SUCCEED:
            return {
                ...state,
                allDistricts: action.data,
            };
        case actionTypes.GET_DISTRICT_BY_PROVINCEID_FAIL:
            return {
                ...state,
                allDistricts: [],
            };

        case actionTypes.GET_ALL_CLINICS_SUCCEED:
            return {
                ...state,
                allClinics: action.data,
            };
        case actionTypes.GET_ALL_CLINICS_FAIL:
            return {
                ...state,
                allClinics: [],
            };

        case actionTypes.GET_CLINIC_BY_ID_SUCCEED:
            return {
                ...state,
                clinic: action.data,
            };
        case actionTypes.GET_CLINIC_BY_ID_FAIL:
            return {
                ...state,
                clinic: [],
            };

        case actionTypes.GET_ALL_PATIENTS_BY_DATE_AND_DOCTORID_SUCCEED:
            return {
                ...state,
                allPatients: action.data,
            };
        case actionTypes.GET_ALL_PATIENTS_BY_DATE_AND_DOCTORID_FAIL:
            return {
                ...state,
                allPatients: [],
            };

        case actionTypes.GET_ALL_SCHEDULES_BY_DATE_AND_DOCTORID_SUCCEED:
            return {
                ...state,
                allSchedulesByDateAndDoctor: action.data,
            };
        case actionTypes.GET_ALL_SCHEDULES_BY_DATE_AND_DOCTORID_FAIL:
            return {
                ...state,
                allSchedulesByDateAndDoctor: [],
            };


        case actionTypes.GET_SPECIALTY_BY_ID_SUCCEED:
            return {
                ...state,
                specialty: action.data,
            };
        case actionTypes.GET_SPECIALTY_BY_ID_FAIL:
            return {
                ...state,
                specialty: [],
            };

        default:
            return state;
    }
};

export default adminReducer;
