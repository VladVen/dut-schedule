import {selectDepartment} from "../parser/selectDepartment";
import {selectTeacher} from "../parser/selectTeacher";
import {InternetAlert} from "../src/Custom/InternetAlert";
import {getInstitute} from "./loginStudentReducer";

const GET_DEP = 'GET_DEP'
const GET_TEACHER = 'GET_TEACHER'
const SAVE_TEACHER = 'SAVE_TEACHER'
const CLEAR_TEACHERS_DATA = 'CLEAR_TEACHERS_DATA'

const initialState = {
   selectData: {
       department: [],
       teacher: [],
   },
   myData: {
       teacher: null
   }
}


export const loginTeacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEP: {
            return {
                ...state,
                selectData: {
                    ...state.selectData,
                    department: action.payload
                }
            }
        }
        case GET_TEACHER: {
            return {
                ...state,
                selectData: {
                    ...state.selectData,
                    teacher: action.payload,
                },
            }
        }
        case SAVE_TEACHER: {
            return {
                ...state,
                myData: {
                    ...state.myData,
                    teacher: action.payload,
                },
            }
        }
        case CLEAR_TEACHERS_DATA: {
            return {
                ...state,
                selectData: {
                    ...state.selectData,
                    department: [],
                    teacher: [],
                },
                myData: {
                    ...state.myData,
                    teacher: null
                }
            }
        }
        default:
            return state
    }
}
const loadDepartment = (dep) => ({
    type: GET_DEP,
    payload: dep
})
const loadTeacher = (teacher) => ({
    type: GET_TEACHER,
    payload: teacher,
})
export const saveTeacher = (teacher) => ({
    type: SAVE_TEACHER,
    payload: teacher,
})
export const clearTeachersData = () => ({
    type: CLEAR_TEACHERS_DATA,
})


export const getDepartment = () => async (dispatch) => {
    try {
        const dep = await selectDepartment()
        dispatch(loadDepartment(dep))
    } catch (e) {
        InternetAlert(e, () => dispatch(getInstitute()))
    }
}
export const getTeacher = (dep) => async (dispatch) => {
    try {
        const teachers = await selectTeacher(dep)
        dispatch(loadTeacher(teachers))
    } catch (e) {
        InternetAlert(e, () => dispatch(getInstitute()))
    }
}


