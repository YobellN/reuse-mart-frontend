import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IResponse } from "@/services/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function HapusDialog({ id, onHapus, label, detail }: { id: any, onHapus: (id: string) => Promise<IResponse<any>>, label: string, detail?: string }) {
    const [disabled, setDisabled] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    async function handleDelete(id: any) {
        try {
            const res = await onHapus(id);
            if (res.message.includes("berhasil")) {
                router.refresh();
                toast.success(`Berhasil menghapus data ${label} ${detail ?? ""}`);
            } else {
                toast.error(res.message || "Gagal menghapus data " + label);
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menghapus data " + label);
        }
    };

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <Button variant="ghost" className="text-destructive" onClick={() => setOpen(true)}>Hapus {label}</Button>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah anda yakin ingin menghapus data {label} {detail}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={disabled}>Batal</AlertDialogCancel>
                        <Button
                            disabled={disabled}
                            variant="destructive"
                            onClick={async () => { setDisabled(true); await handleDelete(id).catch(() => setDisabled(false)).finally(() => setOpen(false)) }}>
                            Hapus
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}