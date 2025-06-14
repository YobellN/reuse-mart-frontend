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
import { PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function KonfirmasiKlaimDialog({
  id,
  onKlaim,
  label,
  detail,
  triggerButton,
}: {
  id: any;
  onKlaim: (id: string) => Promise<IResponse<any>>;
  label: string;
  detail?: string;
  triggerButton?: React.ReactNode;
}) {
  const [disabled, setDisabled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  async function handleKlaim(id: any) {
    try {
      const res = await onKlaim(id);
      if (res.message.includes("berhasil")) {
        router.refresh();
        toast.success(
          `Berhasil klaim merchandise ${label} milik ${detail ?? ""}`
        );
      } else {
        toast.error(res.message || "Gagal klaim merchandise " + label);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengklaim merchandise " + label);
    }
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {triggerButton ? (
          <div onClick={() => setOpen(true)}>{triggerButton}</div>
        ) : (
          <Button variant="default" onClick={() => setOpen(true)}>
            <PackageCheck /> Konfirmasi Pengambilan
          </Button>
        )}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Konfirmasi Pengambilan Merchandise {label} oleh {detail}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={disabled}>Batal</AlertDialogCancel>
            <Button
              disabled={disabled}
              variant="default"
              onClick={async () => {
                setDisabled(true);
                await handleKlaim(id)
                  .catch(() => setDisabled(false))
                  .finally(() => setOpen(false));
              }}
            >
              Konfirmasi Pengambilan
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
