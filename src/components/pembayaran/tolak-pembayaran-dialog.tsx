'use client';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IResponse } from "@/services/utils";
import { Ban } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TolakPembayaranDialog({
    id,
    onTolak,
    detail,
    triggerButton,
}: {
    id: any;
    onTolak: (id: string) => Promise<IResponse<any>>;
    detail?: string;
    triggerButton?: React.ReactNode;
}) {
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    async function handleTolak(id: any) {
        try {
            const res = await onTolak(id);
            if (res.message.includes("berhasil")) {
                router.refresh();
                toast.success(`Pembayaran ${detail ?? ""} berhasil ditolak`);
            } else {
                toast.error(res.message || "Gagal menolak pembayaran");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menolak pembayaran");
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {triggerButton ? (
                <div onClick={() => setOpen(true)}>{triggerButton}</div>
            ) : (
                <Button
                    variant="ghost"
                    className="text-red-600"
                    onClick={() => setOpen(true)}
                >
                    <Ban className="mr-2 h-4 w-4" />
                    Tolak Pembayaran
                </Button>
            )}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Penolakan</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin <b>menolak</b> pembayaran ini{detail ? ` (${detail})` : ""}?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={disabled}>Batal</AlertDialogCancel>
                    <Button
                        disabled={disabled}
                        variant="destructive"
                        onClick={async () => {
                            setDisabled(true);
                            await handleTolak(id)
                                .catch(() => setDisabled(false))
                                .finally(() => setOpen(false));
                        }}
                    >
                        Tolak
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
