import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const body = await req.json()
    console.log(body);
  
    const { message } = body
  
    if (!message) {
      return NextResponse.json({ error: 'Сообщение не передано' }, { status: 400 })
    }
  
    const newMessage = await prisma.message.create({
      data: {
        content: message,
      },
    })
  
    return NextResponse.json(newMessage)
  }