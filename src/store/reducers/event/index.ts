import { EvenState, EventActionEnum, EventActions } from "./types"

const initialState:EvenState = { 
    guests: [],
    events: []
}


export default function EventReducer(state = initialState, action:EventActions):EvenState {
        switch (action.type) {
            case EventActionEnum.SET_GUEST: 
                return {
                    ...state,
                    guests: [...action.payload]
                }
            case EventActionEnum.SET_EVENTS: 
                return {
                    ...state,
                    events: action.payload
                }    
            default: 
                return state
        }
}