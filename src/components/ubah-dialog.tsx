import {
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IResponse } from "@/services/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function UbahDialog({
    id,
    onUbah,
    label,
    detail,
}: {
    id: any;
    onUbah: (id: string) => Promise<IResponse<any>>;
    label: string;
    detail?: string;
}) {
    const [disabled, setDisabled] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    async function handleUpdate(id: any) {
        try {
            const res = await onUbah(id);
            if (res.message.includes("berhasil")) {
                router.refresh();
                toast.success(`Berhasil mengubah data ${label} ${detail ?? ""}`);
            } else {
                toast.error(res.message || "Gagal mengubah data " + label);
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat mengubah data " + label);
        }
    }

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <Button variant="ghost" onClick={() => setOpen(true)}>
                    Ubah {label}
                </Button>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Ubah</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah anda yakin ingin mengubah data {label} {detail}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={disabled}>Batal</AlertDialogCancel>
                        <Button
                            disabled={disabled}
                            onClick={async () => {
                                setDisabled(true);
                                await handleUpdate(id).catch(() => setDisabled(false)).finally(() => setOpen(false));
                            }}
                        >
                            Ubah
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
