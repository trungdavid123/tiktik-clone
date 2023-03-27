import axios from "axios"
import { getToken } from "next-auth/jwt";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchGoogleResponse = async (res: any) => {
    const { user: { name, image }, id } = res;

    const user = {
        _id: id,
        _type: "user",
        userName: name,
        image
    }

    //addUser

    await axios.post(`${BASE_URL}/api/auth/auth`, user);
}

export const fetchAllUsers = async () => {
    const response = await axios.get(`${BASE_URL}/api/users`)
}