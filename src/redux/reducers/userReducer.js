import * as Actiontype from '../constants/userConstants';
let initialState = {
  listUser: [],
  detailUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actiontype.GET_LIST_USER:
      state.listUser = action.data;
      break;
    case Actiontype.POST_DETAIL_USER:
      state.detailUser = action.data;
      break;

    default:
      break;
  }
  return {...state};
};

export default userReducer;
