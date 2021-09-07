import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import { allActionsCreators } from "../store/reducers/actions-creators";

export const useActions =  () => { 
    const dispatch = useDispatch();
    return bindActionCreators(allActionsCreators, dispatch)
}