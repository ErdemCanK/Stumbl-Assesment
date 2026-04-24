import { NextResponse } from 'next/server'
import { getApiSpec } from '@/lib/swagger'

export async function GET() {
  return NextResponse.json(getApiSpec())
}
