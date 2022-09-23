import {selectInst} from "../parser/selectInst.js";
import {selectCourse} from "../parser/selectCourse";
import {selectGroup} from "../parser/selectGroup";

const GET_INST = 'GET_INST'
const GET_COURSE = 'GET_COURSE'
const GET_GROUP = 'GET_GROUP'
const SAVE_GROUP = 'SAVE_GROUP'

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
   }
}


export const loginReducer = (state = initialState, action) => {
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
                },
                selectData: {
                    inst: [],
                    course: [],
                    group: []
                }
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

export const getInstitute = () => async (dispatch) => {
    const inst = await selectInst()
    dispatch(loadInst(inst))
}
export const getCourse = (val) => async (dispatch) => {
    const course = await selectCourse(val)
    dispatch(loadCourse(course, val))
}
export const getGroup = (course) => async (dispatch, getState) => {
    const inst = getState().login.myData.inst
    const group = await selectGroup(inst, course)
    dispatch(loadGroup(group, course))
}

