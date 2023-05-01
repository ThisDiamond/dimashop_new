import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
) {
    return prisma.users.create({
        data: {
            firstname,
            lastname,
            email,
            password,
            user_type: 'user'
        }
    })
}

export async function findUserbyEmail(email: string) {
    return prisma.users.findUnique({
        where: {
            email
        }
    })
}