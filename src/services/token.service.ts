import Jwt from "jsonwebtoken";

const generateJWTToken = (email: string) => {
    const accessToken = Jwt.sign({ email }, String(process.env.JWT_SECRET), { expiresIn: '30d' })
    return accessToken
}

export { generateJWTToken }