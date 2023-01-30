import api from "./api";

async function signUp(name, email, password, image) {
    const response = await api.post(`/signup`, {name, email, password, image});
    return response.data;
}

export { signUp }