import { AppDispatch } from "../..";
import UserService from "../../../api/userService";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventActionEnum, SetEventAction, SetGuestAction } from "./types";

export const EventActionsCreators = {
  setGuests: (payload: IUser[]): SetGuestAction => ({
    type: EventActionEnum.SET_GUEST,
    payload,
  }),
  setEvents: (payload: IEvent[]): SetEventAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionsCreators.setGuests(response.data));
    } catch (error) {
      console.log(error);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionsCreators.setEvents(json));
      localStorage.setItem("events", JSON.stringify(json));
    } catch (error) {
      console.log(error);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
        const events = localStorage.getItem("events") || '[]'
        const json = JSON.parse(events) as IEvent[];
        const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username);
        dispatch(EventActionsCreators.setEvents(currentUserEvents));
    } catch (e) {
        console.log(e)
    }
}
};
