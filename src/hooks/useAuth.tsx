'use client';
import type { State } from "../context/AuthContext";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export function useAuth() {
    return useContext(AuthContext) as State;
}