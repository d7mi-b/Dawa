import { useState } from "react";
import { useAuth } from "./useAuth";
import { api, setToken } from "~/utils/api";
import type { Auth } from "~/context/AuthContext";
import { useRouter } from "next/router";


export const useLogin = () => {
    const [error, setError] = useState<boolean | string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuth() as Auth;

    const router = useRouter();

    const { mutate: handelLogin } = api.user.login.useMutation({
        onSuccess: async (data) => {
            localStorage.setItem("user-Dawa", JSON.stringify( { token: data.token } ));
            dispatch({ type: "LOGIN", payload: { token: data.token } });
            setToken(data.token);
            setIsLoading(false);

            await router.replace('/home');
        },

        onError: (error) => {
            setIsLoading(false);
            if (error.message === "كلمة المرور غير صحيحة" || error.message === "البريد الالكتروني غير صحيح") {
                console.log(error.message)
                setError(error.message);
            } else
                setError("لقد حدث خطأ ما, حاول مرة اخرى")
        }
    });

    const login = (email: string, password: string) => {
        setIsLoading(true);
        setError(false);

        handelLogin({
            email, password
        })
    }

    return { login, isLoading, error }
}