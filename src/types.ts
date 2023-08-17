import type { JwtPayload } from "jsonwebtoken"
import type { NextApiRequest, NextApiResponse } from "next/types"

export interface RequestType extends NextApiRequest {
    user?: string
}

export type OptionsType = {
    req: RequestType,
    res: NextApiResponse
}

export interface TokenValid extends JwtPayload {
    id: string, 
}

export type Role = "User" | "Pharmacy" | "Admin";

export interface User {
    id: string
    name: string
    email: string
    phone: number
    password: string
    role: Role
    createdAt: Date
    updatedAt: Date
}

export interface Request {
    id: string,
    medicine: string
    description?: string | null
    image: string
    city: string
    neighborhood?: string | null
    createdAt: Date
    updatedAt: Date
    user_id: string
}

export interface Donation {
    id: string,
    medicine: string
    description?: string | null
    image: string
    quantity: string
    expiry_Date: Date
    city: string
    neighborhood?: string | null
    createdAt: Date
    updatedAt: Date
    user_id: string
}