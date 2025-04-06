const initialState = {
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    authUser: null,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
}

const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_IS_SIGNING_UP":
            return { ...state, isSigningUp: action.payload };
        case "SET_IS_LOGGING_IN":
            return { ...state, isLoggingIn: action.payload };
        case "SET_IS_UPDATING_PROFILE":
            return { ...state, isUpdatingProfile: action.payload };
        case "SET_AUTH_USER":
            return { ...state, authUser: action.payload };
        case "SET_IS_CHECKING_AUTH":
            return { ...state, isCheckingAuth: action.payload };
        case "SET_SOCKET":
            return { ...state, socket: action.payload };
        case "SET_ONLINE_USERS":
            return { ...state, onlineUsers: action.payload };
        default:
            return state;
    }
}

export default userAuthReducer;