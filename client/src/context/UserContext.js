import React, { createContext, useReducer } from 'react';

export const UserContext = createContext(null);

export const signIn = 'SIGN_IN';

const authReducer = (state, action) => {
    switch (action.type) {
        case signIn:
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            return { ...state, auth: true, user: action.payload.user };

        default:
            console.error("Action not found!");
            return state
    }
}

// State within TokenProvider is accessible across all components
export const TokenProvider = (props) => {

    const [authState, dispatch] = useReducer(authReducer, {
        auth: !!localStorage.getItem("token"),
        user: !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    });

    return (
        <UserContext.Provider value={{ authState, dispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

