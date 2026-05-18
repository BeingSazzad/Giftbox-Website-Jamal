import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  // TODO: Connect to your backend / database
  console.log('Auth route hit:', body)

  return NextResponse.json({ message: 'Auth endpoint' }, { status: 200 })
}
