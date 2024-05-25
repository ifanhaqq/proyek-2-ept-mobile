import axiosLib from 'axios'

const axios = axiosLib.create({
    baseURL: "http://192.168.20.99:8000/api",
    headers: {
        Accept: "application/json"
    }
})

export default axios