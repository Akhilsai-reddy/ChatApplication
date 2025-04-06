const initialState = {
  users: [],
  messages: [],
  isFetchingUsers: false,
  selectedUser: null,
  isFetchingMessages: false,
};

const usersAndMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IS_FETCHING_USERS":
      return { ...state, isFetchingUsers: action.payload };
    case "SET_USERS":
      if (JSON.stringify(state.users) !== JSON.stringify(action.payload)) {
        return { ...state, users: action.payload };
      }
      return state;
    case "SET_SELECTED_USER":
      return { ...state, selectedUser: action.payload };
    case "SET_IS_FETCHING_MESSAGES":
      return { ...state, isFetchingMessages: action.payload };
    case "GET_MESSAGES":
      return { ...state, messages: action.payload };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: state.messages.some((msg) => msg.id === action.payload.id)
          ? state.messages
          : [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default usersAndMessagesReducer;
