import axios from 'axios'
import { User } from "../models";
import { API_END } from "../assets/constants";

class AuthController {
    async login(
        email: string,
        password: string
    ): Promise<User | undefined> {
        const response = await fetch(`${API_END}/user/${email}`, {
            method: "GET",
            headers: {
                // todo will add additional JWT token
                "Content-Type": "application/json",
                Authorization: `Basic ${btoa(`${email}:${password}`)}`,
            },
        });
        const result = await axios.post(`${API_END}/user/login`, {
            email,
            password
        })
        if (result.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(result.data.accessToken));
        }
        if (result.data.user) {
            return result.data.user
        }
        if (!response.ok) return;

        const user = await response.json();

        if (!user.id) return;

        return user;
    }

    async logout() {
        localStorage.removeItem("user");
    }

    async register(user: User) {
        const { email, password, last, first } = user
        return await axios.post(`${API_END}/user/register`, {
            email,
            password,
            last,
            first,
            post: []
        })
    }
}

export default new AuthController()