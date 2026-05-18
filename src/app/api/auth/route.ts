import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // Connect your backend / database here
  return NextResponse.json({ message: 'OK', data: body }, { status: 200 })
}
