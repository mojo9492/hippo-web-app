import { MBP_END } from "../../models/Core"

export default async function login(email: string, password: string) {
    const response = await fetch(`${MBP_END}/user/${email}`, {
        method: 'GET',
        headers: { // todo will add additional JWT token
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${email}:${password}`)}`
        }
    })
    if (!response.ok) return false

    const user = await response.json()

    if (!user.id) return false
    
    localStorage.setItem('token', String(user.id))

    return user
}