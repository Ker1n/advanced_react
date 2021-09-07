import { AuthActionsCreators } from "./auth/actions-creators";
import { EventActionsCreators } from "./event/action-creators";

export const allActionsCreators = { 
    ...AuthActionsCreators,
    ...EventActionsCreators
}