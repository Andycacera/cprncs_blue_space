"use client"

import { UserTable } from "@/components/user-table"
import { UserDialog } from "@/components/user-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Plus } from "lucide-react"

export default function Home() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="mt-2 text-muted-foreground">Manage your users and their information</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <UserTable />

        <UserDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
      </div>
    </main>
  )
}
