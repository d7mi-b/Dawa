import { useRouter } from "next/router";
import { useAuth } from "./useAuth";
import type { Auth } from "~/context/AuthContext";

export const useLogout = () => {
    const { dispatch } = useAuth() as Auth;
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("user-Dawa");
        dispatch({ type: "LOGOUT", payload: { token: '' } });
        router.replace('/');  //eslint-disable-line
    }

    return { logout };
}