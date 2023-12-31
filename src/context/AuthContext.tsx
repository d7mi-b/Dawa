"use client"
import type { Dispatch, ReactNode } from 'react'
import { createContext, useEffect, useReducer } from "react";
import { useRouter } from 'next/router';
import { useAuth } from "~/hooks/useAuth";
import Home from "~/pages";
import { setToken } from "~/utils/api";
import Login from '~/pages/login';
import Signup from '~/pages/signup';

export type State = {
    user: User | null
}

type Action = {
    type: string,
    payload: User
}

type Props = {
    children: ReactNode;
};

type User = {
    token: string,
    avatar?: string
}

export type Auth = {
    user: User,
    dispatch: Dispatch<Action>
}

export const authReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
}

export const AuthContext = createContext<Auth | {}>({ });  //eslint-disable-line

export function AuthProvider({ children }: Props) {
    const [state, dispatch]: [State, Dispatch<Action>] = useReducer(authReducer, {
        user: null
    }); //eslint-disable-line

    console.log('AuthContext State: ', state);

    useEffect(() => {
        const user: User = JSON.parse(localStorage.getItem('user-Dawa') || '{}'); //eslint-disable-line

        if (user.token) {
            setToken(user.token)
            dispatch({type: 'LOGIN', payload: user});
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}

export const ProtectRoute = ({ children }: Props) => {
    const { user } = useAuth() as Auth;

    const router = useRouter()

    if (!user && (router.pathname === '/')) {
        return <Home />;
    }

    if (!user && (router.pathname === '/signup')) {
        return <Signup />;
    }

    if (!user && (router.pathname !== '/login')) {
        return <Login />;
    }
    
    return children;
};