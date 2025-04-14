import api from "../services/api";
export async function userLoader() {
    const response = await api.get("/owners");
    return response.data;
}