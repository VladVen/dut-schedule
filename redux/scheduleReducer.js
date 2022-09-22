import {getSched} from "../parser/getSched";

const LOAD_CURRENT_SCHEDULE = 'LOAD_CURRENT_SCHEDULE'
const LOAD_NEXT_SCHEDULE = 'LOAD_NEXT_SCHEDULE'


const initialState = {
    month: {
        currentWeek: [],
        nextWeek: [],
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


export const getCurrentWeek = (group) => async (dispatch) => {

    let d = new Date();
    let date1 = new Date(d.setDate(d.getDate() - (d.getDay() + 6) % 7))
    let date2 = new Date(d.setDate(d.getDate() + 6 + (((1 + 7 - d.getDay()) % 7) || 7)))
    let parsedDate1 = date1.getDate() + "." + (date1.getMonth() + 1) + "." + date1.getFullYear()
    let parsedDate2 = date2.getDate() + "." + (date2.getMonth() + 1) + "." + date2.getFullYear()

    const schedule = await getSched(group, parsedDate1 , parsedDate2)
    dispatch(loadCurrentWeek(schedule))
}

export const getNextWeek = (group) => async (dispatch) => {
    let d = new Date();
    const date1 = new Date(d.setDate(d.getDate() + (((1 + 7 - d.getDay()) % 7) || 7)))
    const date2 = new Date(d.setDate(d.getDate() + 6 + (((1 + 7 - d.getDay()) % 7) || 7)))
    let parsedDate1 = date1.getDate() + "." + (date1.getMonth() + 1) + "." + date1.getFullYear()
    let parsedDate2 = date2.getDate() + "." + (date2.getMonth() + 1) + "." + date2.getFullYear()

    const schedule = await getSched(group, parsedDate1 , parsedDate2)
    dispatch(loadNextWeek(schedule))
}