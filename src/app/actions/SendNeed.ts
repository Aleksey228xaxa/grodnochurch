'use server'

import { prisma } from "../../../prisma/prisma-client";

export async function sendNeed(name: string, content: string) {
    try {
        if (!name || !content) throw new Error("Не передано имя или содержимое");

        const newNeed = await prisma.needs.create({
            data: {
                name,
                content,
            }
        })

        return {success: true, newNeed}

    } catch(error) {
        console.error('Ошибка при создании записи Needs:', error)

        return {success: false, error: 'Внутренняя ошибка сервера'}
    }
}