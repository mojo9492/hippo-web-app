import { User } from "../models";

export default function authHeader() {
    const userItem = localStorage.getItem('user')
    if (!userItem) return {}

    const user: User = JSON.parse(userItem);
    return { 'x-access-token': user.accessToken };
}