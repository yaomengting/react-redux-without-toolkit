import filterAPI from "../mockAPI/filterAPI";

const filterState = {
  status: "All",
  colors: []
}

export default function filterReducer(state = filterState, action){
switch (action.type){
  case "CHANGE_STATUS_FILTER":
    return { ...state, status: action.payload } ;
  case "CHANGE_COLOR_FILTER":
    return {
        ...state,
        colors: action.payload
    };
  default:
    return state;
}
}

export const changeStatusFilterAsync = (status) => {
  return async (dispatch) => {
    await filterAPI.changeStatusFilter(status);
    dispatch(changeStatusFilter(status));
  }
}

export const changeColorFilterAsync = (colors) => {
  return async (dispatch) => {
    await filterAPI.changeColorFilter(colors);
    dispatch(changeColorFilter(colors));
  }
}

export function changeStatusFilter(status) {
return { type: "CHANGE_STATUS_FILTER", payload: status }
}

export function changeColorFilter(colors) {
return { type: "CHANGE_COLOR_FILTER", payload: colors }
}
