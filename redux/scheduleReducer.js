import {getSched} from "../parser/getSched";

const LOAD_CURRENT_SCHEDULE = 'LOAD_CURRENT_SCHEDULE'
const LOAD_NEXT_SCHEDULE = 'LOAD_NEXT_SCHEDULE'
const LOAD_SECOND_SCHEDULE = 'LOAD_SECOND_SCHEDULE'
const LOAD_THIRD_SCHEDULE = 'LOAD_THIRD_SCHEDULE'


const initialState = {
    month: {
        currentWeek: [],
        nextWeek: [],
        secondWeek: [],
        thirdWeek: []
    }
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

const getParsedDate = (d, date1) => {
    let date2 = new Date(d.setDate(d.getDate() + 6 + (((1 + 7 - d.getDay()) % 7) || 7)))
    let parsedDate1 = date1.getDate() + "." + (date1.getMonth() + 1) + "." + date1.getFullYear()
    let parsedDate2 = date2.getDate() + "." + (date2.getMonth() + 1) + "." + date2.getFullYear()
    return [parsedDate1, parsedDate2]
}

const getDate1 = (number = 0) => {
    let d = new Date();
    const date1 = new Date(d.setDate(d.getDate() + number  + (((1 + 7 - d.getDay()) % 7) || 7)))
    return [d, date1]
}


export const getCurrentWeek = (group) => async (dispatch) => {

    let d = new Date();
    let date1 = new Date(d.setDate(d.getDate() - (d.getDay() + 6) % 7))
    const [parsedDate1, parsedDate2] = getParsedDate(d, date1)

    const schedule = await getSched(group, parsedDate1 , parsedDate2)
    dispatch(loadCurrentWeek(schedule))
}

export const getNextWeek = (group) => async (dispatch) => {
    const [d, date1] = getDate1()
    const [parsedDate1, parsedDate2] = getParsedDate(d, date1)
    const schedule = await getSched(group, parsedDate1 , parsedDate2)
    dispatch(loadNextWeek(schedule))
}
export const getSecondWeek = (group) => async (dispatch) => {
    const [d, date1] = getDate1(7)
    const [parsedDate1, parsedDate2] = getParsedDate(d, date1)
    const schedule = await getSched(group, parsedDate1 , parsedDate2)
    dispatch(loadSecondWeek(schedule))
}
export const getThirdWeek = (group) => async (dispatch) => {
    const [d, date1] = getDate1(14)
    const [parsedDate1, parsedDate2] = getParsedDate(d, date1)
    const schedule = await getSched(group, parsedDate1 , parsedDate2)
    dispatch(loadThirdWeek(schedule))
}