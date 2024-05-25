import axios from "../utils/axios"
import { setToken } from "./TokenServices"

export async function login(credentials) {
    const {data} = await axios.post("/mobile-login", credentials)
    await setToken(data.token)

}

export async function register(registerInfo) {
    await axios.post("/mobile-register", registerInfo)
}

export async function loadUser() {
    const {data: user} = await axios.get("/user")

    return user;
}

export async function logout() {

    await axios.post("/mobile-logout", {})

    await setToken(null)
}



