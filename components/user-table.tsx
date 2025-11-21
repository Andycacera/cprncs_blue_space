"use client"

import useSWR from "swr"
import type { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { UserDialog } from "./user-dialog"
import { UserDetailsDialog } from "./user-details-dialog"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function UserTable() {
  const { data: users, mutate } = useSWR<User[]>("/api/users", fetcher)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [viewingUser, setViewingUser] = useState<User | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    await fetch(`/api/users/${id}`, { method: "DELETE" })
    mutate()
  }

  if (!users) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>
  }

  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-dashed py-12 text-center">
        <p className="text-muted-foreground">No users yet. Create your first user to get started.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="cursor-pointer" onClick={() => setViewingUser(user)}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingUser(user)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(user.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserDialog user={editingUser} open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)} />

      <UserDetailsDialog
        user={viewingUser}
        open={!!viewingUser}
        onOpenChange={(open) => !open && setViewingUser(null)}
      />
    </>
  )
}
