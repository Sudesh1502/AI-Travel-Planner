import api from "../libs/axios.js";

export const registerUser = async(userData) =>{
    const response = await api.post("/api/auth/register", userData);
    return response.data;
}
export const loginUser = async(userData) =>{
    const response = await api.post("/api/auth/login", userData);
    // Axios puts the body in .data, and your API puts the profile in .user
    return response.data.user;
}
export const logoutUser = async(userData) =>{
    const response = await api.post("/api/auth/logout", userData);
    return response.data;
}

export const getCurrentUser = async() => {
    const response = await api.get("/api/auth/get-me");
    return response.data.data;
}
