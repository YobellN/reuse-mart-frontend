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

export default function BatalTransaksiDialog({
    id,
    onTolak,
    detail,
    triggerButton,
    totalTransaksi,
    jumlahPoin,
    totalPoinSetelah,
}: {
    id: any;
    onTolak: (id: string) => Promise<IResponse<any>>;
    detail?: string;
    triggerButton?: React.ReactNode;
    totalTransaksi: number;
    jumlahPoin: number;
    totalPoinSetelah: number;
}) {
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    async function handleTolak(id: any) {
        try {
            const res = await onTolak(id);
            if (res.message.includes("berhasil")) {
                router.refresh();
                toast.success(`Pembayaran${detail ? ` ${detail}` : ""} berhasil dibatalkan`);
            } else {
                toast.error(res.message || "Gagal membatalkan pembayaran");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat membatalkan pembayaran");
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
                    Batalkan Transaksi
                </Button>
            )}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Pembatalan Transaksi</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div>
                            Apakah Anda yakin ingin <b>membatalkan transaksi ini</b>
                            {detail ? ` (${detail})` : ""}?
                            <ul className="mt-4 space-y-1 text-sm">
                                <li>
                                    <span className="text-muted-foreground">Jumlah total transaksi:</span>{" "}
                                    <b>Rp {totalTransaksi.toLocaleString("id-ID")}</b>
                                </li>
                                <li>
                                    <span className="text-muted-foreground">Akan dikonversi menjadi poin reward sebanyak:</span>{" "}
                                    <b>{jumlahPoin}</b>
                                </li>
                                <li>
                                    <span className="text-muted-foreground">Total poin Anda setelah ini:</span>{" "}
                                    <b>{totalPoinSetelah+jumlahPoin}</b>
                                </li>
                            </ul>
                            <div className="mt-2 text-xs text-muted-foreground">
                                Pembatalan transaksi akan mengembalikan nilai transaksi dalam bentuk poin reward.
                            </div>
                        </div>
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
                        Batalkan
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
