import { AppDispatch } from "../..";
import { IUser } from "../../../models/IUser";
import axios from "axios";
import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from "./types";

export const AuthActionsCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionsCreators.setIsLoading(true));
        setTimeout(async () => {
          const response = await axios.get<IUser[]>("./users.json");
          const mockUser = response.data.find(
            (user) => user.username === username && user.password === password
          );

          if (mockUser) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", mockUser.username);
            dispatch(AuthActionsCreators.setUser(mockUser));    
            dispatch(AuthActionsCreators.setIsAuth(true));   
          } else {
            dispatch(
              AuthActionsCreators.setError("user name or password incorrect")
            );
          }
      
        }, 1500); // imitate response to back-end 1500ms
      } catch (error) {
        dispatch(AuthActionsCreators.setError("Something went wrong"));
      } finally { 
        dispatch(AuthActionsCreators.setIsLoading(false));
      }
    },
  logout: (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem('auth');
      localStorage.removeItem('username');
      dispatch(AuthActionsCreators.setUser({} as IUser));
      dispatch(AuthActionsCreators.setIsAuth(false));
    } catch (error) {
      console.log(error)
    }
  },
};
