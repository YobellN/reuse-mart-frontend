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
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TerimaPembayaranDialog({
    id,
    onTerima,
    detail,
    triggerButton,
}: {
    id: any;
    onTerima: (id: string) => Promise<IResponse<any>>;
    detail?: string;
    triggerButton?: React.ReactNode;
}) {
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    async function handleTerima(id: any) {
        try {
            const res = await onTerima(id);
            if (res.message.includes("berhasil")) {
                router.refresh();
                toast.success(`Pembayaran ${detail ?? ""} berhasil dikonfirmasi`);
            } else {
                toast.error(res.message || "Gagal mengonfirmasi pembayaran");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menerima pembayaran");
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {triggerButton ? (
                <div onClick={() => setOpen(true)}>{triggerButton}</div>
            ) : (
                <Button
                    variant="outline"
                    className="text-green-600 border-green-600"
                    onClick={() => setOpen(true)}
                >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Terima Pembayaran
                </Button>
            )}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Pembayaran</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin <b>menerima</b> pembayaran ini{detail ? ` (${detail})` : ""}?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={disabled}>Batal</AlertDialogCancel>
                    <Button
                        disabled={disabled}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={async () => {
                            setDisabled(true);
                            await handleTerima(id)
                                .catch(() => setDisabled(false))
                                .finally(() => setOpen(false));
                        }}
                    >
                        Terima
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
