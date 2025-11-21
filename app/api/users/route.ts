import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/api-config"

export async function GET() {
  const response = await fetch(`${API_BASE_URL}/users`)
  const users = await response.json()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()

  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const newUser = await response.json()
  return NextResponse.json(newUser, { status: 201 })
}
