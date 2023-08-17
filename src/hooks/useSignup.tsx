import { useState } from "react";
import { useAuth } from "./useAuth";
import { api, setToken } from "~/utils/api";
import type { Auth } from "~/context/AuthContext";
import type { Role } from "~/types";

export const useSignup = () => {
    const [error, setError] = useState<boolean | string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuth() as Auth;

    const signupAPI = api.user.signup.useMutation({
        onSuccess: (data) => {
            localStorage.setItem("user-Dawa", JSON.stringify( { token: data.token } ))
            dispatch({ type: "LOGIN", payload: { token: data.token } });
            setToken(data.token);
            setIsLoading(false);

            window.location.replace('/home')
        },

        onError: (error) => {
            setIsLoading(false);
            setError(error.message);
        }
    });


    const signup = (name: string, email: string, password: string, phone: number, role: Role) => {
        setIsLoading(true);
        setError(false);

        signupAPI.mutate({ 
            name, email, phone, password, role
        })
    }

    return { signup, isLoading, error }
}