'use client'

import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IResponse } from "@/services/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function ConfirmDialog({ onConfirm, description, message, label }: { onConfirm: () => Promise<IResponse<any>>, label: string, message: string, description: string }) {
    const [disabled, setDisabled] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    async function handle() {
        try {
            const res = await onConfirm().finally();
            if (res.message.includes("berhasil")) {
                toast.success(`${message}`);
                router.refresh();
                
            } else {
                toast.error(res.message || "Gagal melakukan" + label);
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat melakukan" + label);
        }
    };

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <Button variant="ghost" className="text-primary" onClick={() => setOpen(true)}>{label}</Button>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{label}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={disabled}>Batal</AlertDialogCancel>
                        <Button
                            disabled={disabled}
                            variant="default"
                            onClick={async () => { setDisabled(true); await handle().catch(() => setDisabled(false)).finally(() => setOpen(false)) }}>
                            Ya
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}