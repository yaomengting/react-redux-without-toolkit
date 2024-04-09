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
}
}

export function changeStatusFilter(status) {
return { type: "CHANGE_STATUS_FILTER", payload: status }
}

export function changeColorFilter(colors) {
return { type: "CHANGE_COLOR_FILTER", payload: colors }
}
