import argon2 from 'argon2'

export default  async function hashToken(token: string): Promise<string> {
    return await argon2.hash(token)
}

export  async function verifyPassword(hash: string, password: string){
    return await argon2.verify(hash, password)
}