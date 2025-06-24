'use server'

import { prisma } from "../../../prisma/prisma-client"


export async function sendMessage(message: string) {
  if (!message) {
    return { error: 'Сообщение не передано' }
  }

  try {
    const newMessage = await prisma.message.create({
      data: { content: message },
    })
    return { success: true, data: newMessage }
  } catch (error) {
    console.error('Ошибка при создании сообщения:', error)
    return { error: 'Внутренняя ошибка сервера' }
  }
}