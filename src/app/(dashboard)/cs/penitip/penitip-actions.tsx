"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Penitip } from "./columns"
import handleDeletePenitip from "@/services/penitip/handle-delete-penitip"

export default function PenitipActions({ row }: { row: { original: Penitip } }) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const hapusPenitip = async () => {
        const res = await handleDeletePenitip(row.original.id_penitip)
        alert(res.message)
        setOpenDeleteDialog(false)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                    <DropdownMenuItem>Edit penitip</DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <button
                            className="w-full text-left"
                            onClick={(e) => {
                                e.preventDefault();
                                setTimeout(() => setOpenDeleteDialog(true), 0);
                            }}
                        >
                            Hapus Penitip
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Hapus Penitip</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus penitip ini ({row.original.user.nama})?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={hapusPenitip}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
