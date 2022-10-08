import {selectInst} from "../parser/selectInst.js";
import {selectCourse} from "../parser/selectCourse";
import {selectGroup} from "../parser/selectGroup";
import {InternetAlert} from "../src/Custom/InternetAlert";

const GET_INST = 'GET_INST'
const GET_COURSE = 'GET_COURSE'
const GET_GROUP = 'GET_GROUP'
const SAVE_GROUP = 'SAVE_GROUP'
const CLEAR_STUDENTS_DATA = 'CLEAR_STUDENTS_DATA'
const CATCH_STUDENTS_ERROR = 'CATCH_STUDENTS_ERROR'


const initialState = {
    selectData: {
        inst: [],
        course: [],
        group: []
    },
    myData: {
        inst: null,
        course: null,
        group: null
    },
}


export const loginStudentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INST: {
            return {
                ...state,
                selectData: {
                    ...state.selectData,
                    inst: action.payload
                }
            }
        }
        case GET_COURSE: {
            return {
                ...state,
                selectData: {
                    ...state.selectData,
                    course: action.payload,
                    group: []
                },
                myData: {
                    ...state.myData,
                    inst: action.myData
                }
            }
        }
        case GET_GROUP: {
            return {
                ...state,
                selectData: {
                    ...state.selectData,
                    group: action.payload
                },
                myData: {
                    ...state.myData,
                    course: action.myData
                }
            }
        }
        case SAVE_GROUP: {
            return {
                ...state,
                myData: {
                    ...state.myData,
                    group: action.myData
                }
            }
        }
        case CLEAR_STUDENTS_DATA: {
            return {
                ...state,
                selectData: {
                    ...state.selectData,
                    inst: [],
                    course: [],
                    group: []
                },
                myData: {
                    ...state.myData,
                    inst: null,
                    course: null,
                    group: null
                }
            }
        }
        case CATCH_STUDENTS_ERROR: {
            return {
                ...state,
                errorMessage: action.error
            }
        }
        default:
            return state
    }
}
const loadInst = (inst) => ({
    type: GET_INST,
    payload: inst
})
const loadCourse = (course, val) => ({
    type: GET_COURSE,
    payload: course,
    myData: val
})
const loadGroup = (group, val) => ({
    type: GET_GROUP,
    payload: group,
    myData: val
})
export const saveGroup = (val) => ({
    type: SAVE_GROUP,
    myData: val
})
export const clearStudentsData = () => ({
    type: CLEAR_STUDENTS_DATA,
})


export const getInstitute = () => async (dispatch) => {
    try {
        const inst = await selectInst()
        dispatch(loadInst(inst))
    } catch (e) {
        InternetAlert(e, () => dispatch(getInstitute()))
    }
}
export const getCourse = (val) => async (dispatch) => {
    try {
        const course = await selectCourse(val)
        dispatch(loadCourse(course, val))
    } catch (e) {
        InternetAlert(e, () => dispatch(getInstitute()))
    }
}
export const getGroup = (course) => async (dispatch, getState) => {
    try {
        const inst = getState().login.myData.inst
        const group = await selectGroup(inst, course)
        dispatch(loadGroup(group, course))
    } catch (e) {
        InternetAlert(e, () => dispatch(getInstitute()))
    }
}

