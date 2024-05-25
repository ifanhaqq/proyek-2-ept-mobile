import axios from "../utils/axios"
import { getToken, setToken } from "./TokenServices"

export async function login(credentials) {
    const {data} = await axios.post("/mobile-login", credentials)
    await setToken(data.token)

}

export async function loadUser() {
    const token = await getToken()
    const {data: user} = await axios.get("/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return user;
}

export async function logout() {
    const token = await getToken()

    await axios.post(
        "/mobile-logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    await setToken(null)
}



