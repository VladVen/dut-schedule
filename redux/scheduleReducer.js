import {getSched} from "../parser/getSched";

const LOAD_SCHEDULE = 'LOAD_SCHEDULE'


const initialState = {
   schedule: {
       oneWeek: [],
       twoWeek: [],
   }
}


export const scheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SCHEDULE: {
            return {
                ...state,
                schedule: {
                    ...state.schedule,
                    oneWeek: action.payload
                }
            }
        }
        default:
            return state
    }
}
const loadSchedule = (sched) => ({
    type: LOAD_SCHEDULE,
    payload: sched
})

export const getSchedule = (group) => async (dispatch) => {
    const schedule = await getSched(group)
    console.log(schedule)
    dispatch(loadSchedule(schedule))
}