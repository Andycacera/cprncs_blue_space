import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/api-config"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const response = await fetch(`${API_BASE_URL}/users/${id}`)

  if (!response.ok) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const user = await response.json()
  return NextResponse.json(user)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()

  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const updatedUser = await response.json()
  return NextResponse.json(updatedUser)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
