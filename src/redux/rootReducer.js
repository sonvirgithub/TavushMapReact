import answerReducer from "./answer/answerReducer";
import authReducer from "./auth/reducers/authReducer";
import categoryReducer from "./category/categoryReducer";
import settingReducer from "./setting/settingReducer"
import organizationReducer from "./organization/organizationReducer"
import supportTypeReducer from "./supportType/supportTypeReducer"
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    answer: answerReducer,
    auth: authReducer,
    cat: categoryReducer,
    set: settingReducer,
    org: organizationReducer,
    support: supportTypeReducer

})

export default rootReducer