import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog"
import React from "react"

export function ConfirmDialog({ open, button, title, desctiption, confirmation, confirmationText }: { open: boolean, button: React.ReactNode, title: string, desctiption: string, confirmation: React.ComponentProps<typeof AlertDialogAction>, confirmationText: string }) {
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                {button}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {desctiption}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => open = false}>Batal</AlertDialogCancel>
                    <AlertDialogAction {...confirmation}>{confirmationText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
