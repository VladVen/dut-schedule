import {getSchedStudent} from "../parser/getSchedStudent";
import {getSchedTeacher} from "../parser/getSchedTeacher";
import {InternetAlert} from "../src/Custom/InternetAlert";
import {getInstitute} from "./loginStudentReducer";

const LOAD_CURRENT_SCHEDULE = 'LOAD_CURRENT_SCHEDULE'
const LOAD_NEXT_SCHEDULE = 'LOAD_NEXT_SCHEDULE'
const LOAD_SECOND_SCHEDULE = 'LOAD_SECOND_SCHEDULE'
const LOAD_THIRD_SCHEDULE = 'LOAD_THIRD_SCHEDULE'
const SET_FETCHING = 'SET_FETCHING'

const initialState = {
    month: {
        currentWeek: [],
        nextWeek: [],
        secondWeek: [],
        thirdWeek: []
    },
    fetching: true
}


export const scheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CURRENT_SCHEDULE: {
            return {
                ...state,
                month: {
                    ...state.month,
                    currentWeek: action.payload
                }
            }
        }
        case LOAD_NEXT_SCHEDULE: {
            return {
                ...state,
                month: {
                    ...state.month,
                    nextWeek: action.payload
                }
            }
        }
        case LOAD_SECOND_SCHEDULE: {
            return {
                ...state,
                month: {
                    ...state.month,
                    secondWeek: action.payload
                }
            }
        }
        case LOAD_THIRD_SCHEDULE: {
            return {
                ...state,
                month: {
                    ...state.month,
                    thirdWeek: action.payload
                }
            }
        }
        case SET_FETCHING: {
            return {
                ...state,
               fetching: action.status
                }
            }
        default:
            return state
    }
}
const loadCurrentWeek = (sched) => ({
    type: LOAD_CURRENT_SCHEDULE,
    payload: sched
})
const loadNextWeek = (sched) => ({
    type: LOAD_NEXT_SCHEDULE,
    payload: sched
})
const loadSecondWeek = (sched) => ({
    type: LOAD_SECOND_SCHEDULE,
    payload: sched
})
const loadThirdWeek = (sched) => ({
    type: LOAD_THIRD_SCHEDULE,
    payload: sched
})


 const setFetching = (status) => ({
    type: SET_FETCHING,
    status
})


const getParsedDate = (d, date1) => {
    let date2 = new Date(d.setDate(d.getDate() + 6 + (((1 + 7 - d.getDay()) % 7) || 7)))
    let parsedDate1 = date1.getDate() + "." + (date1.getMonth() + 1) + "." + date1.getFullYear()
    let parsedDate2 = date2.getDate() + "." + (date2.getMonth() + 1) + "." + date2.getFullYear()
    return [parsedDate1, parsedDate2]
}

const getDate1 = (number = 0) => {
    let d = new Date();
    const date1 = new Date(d.setDate(d.getDate() + number + (((1 + 7 - d.getDay()) % 7) || 7)))
    return [d, date1]
}


export const getSchedule = (group, audience = 'student') => async dispatch => {
    let method = getSchedStudent
    if (audience === 'teacher') {
        method = getSchedTeacher
    }
    dispatch(setFetching(true))
    try {
        await dispatch(getCurrentWeek(group, method))
    } catch (e) {
        InternetAlert(e, () => dispatch(getInstitute()))
    }
    try {
        await dispatch(getNextWeek(group, method))

    } catch (e) {
        InternetAlert(e, () => dispatch(getInstitute()))
    }
    try {
        await dispatch(getSecondWeek(group, method))

    } catch (e) {
        InternetAlert(e, () => dispatch(getInstitute()))
    }
    try {
        await dispatch(getThirdWeek(group, method))

    } catch (e) {
        InternetAlert(e, () => dispatch(getInstitute()))
    } finally {
        dispatch(setFetching(false))
    }

}

export const getCurrentWeek = (group, method) => async (dispatch) => {
    try {
        let d = new Date();
        let date1 = new Date(d.setDate(d.getDate() - (d.getDay() + 6) % 7))
        const [parsedDate1, parsedDate2] = getParsedDate(d, date1)

        const schedule = await method(group, parsedDate1, parsedDate2)
        dispatch(loadCurrentWeek(schedule))
    } catch (e) {
        throw e
    }

}

export const getNextWeek = (group, method) => async (dispatch) => {
    try {
        const [d, date1] = getDate1()
        const [parsedDate1, parsedDate2] = getParsedDate(d, date1)
        const schedule = await method(group, parsedDate1, parsedDate2)
        dispatch(loadNextWeek(schedule))
    } catch (e) {
        throw e
    }

}
export const getSecondWeek = (group, method) => async (dispatch) => {
    try {
        const [d, date1] = getDate1(7)
        const [parsedDate1, parsedDate2] = getParsedDate(d, date1)
        const schedule = await method(group, parsedDate1, parsedDate2)
        dispatch(loadSecondWeek(schedule))
    } catch (e) {
        throw e
    }

}
export const getThirdWeek = (group, method) => async (dispatch) => {
    try {
        const [d, date1] = getDate1(14)
        const [parsedDate1, parsedDate2] = getParsedDate(d, date1)
        const schedule = await method(group, parsedDate1, parsedDate2)
        dispatch(loadThirdWeek(schedule))
    } catch (e) {
        throw e
    }

}