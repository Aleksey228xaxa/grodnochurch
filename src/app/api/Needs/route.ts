import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, content } = body

    if (!name || !content) {
      return NextResponse.json(
        { error: 'Не передано имя или содержимое' }, 
        { status: 400 }
      )
    }

    const newNeed = await prisma.needs.create({
      data: {
        name,
        content,
      },
    })

    return NextResponse.json(newNeed)
  } catch (error) {
    console.error('Ошибка при создании записи Needs:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' }, 
      { status: 500 }
    )
  }
}
