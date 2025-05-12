"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { handleNewDiskusi } from "@/services/diskusi/diskusi-services";
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"

const formSchema = z.object({
  pesan: z.string().min(1).max(500).nonempty({ message: "Pesan tidak boleh kosong" }),
  id_produk: z.string()
})

type FormScheme = z.infer<typeof formSchema>;

export default function DiskusiPembeliForm({ id_produk }: { id_produk: string }) {
  const router = useRouter();
  const [submit, setSubmit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<FormScheme>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pesan: "",
      id_produk: id_produk,
    },
  });

  const finalFormData = React.useRef(new FormData());

  async function onSubmit(values: FormScheme) {
    const isValid = await form.trigger();

    if (isValid) {
      const formData = new FormData();
      formData.append("pesan", values.pesan);
      formData.append("id_produk", values.id_produk);
      finalFormData.current = formData;
      setOpen(true);
    } else {
      toast.error("Form belum valid");
    }
  }

  async function handleSubmit(data: FormData) {
    setSubmit(true);

    try {
      const result = await handleNewDiskusi(data);
      if (result.message === "Berhasil menambah diskusi") {
        toast.success("Pesan berhasil dikirim");
        form.reset();
        setOpen(false);
        router.refresh();
      } else {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            form.setError(field as keyof FormScheme, {
              type: "server",
              message: Array.isArray(message) ? message[0] : String(message),
            });
          });
        }
        toast.error("Gagal mengirim pesan "+ result.errors);
      }
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    } finally {
      setSubmit(false);
      setOpen(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center w-full space-y-4">
        <input type="hidden" value={id_produk} {...form.register("id_produk")} />
        <FormField
          control={form.control}
          name="pesan"
          render={({ field }) => (
            <FormItem className="w-full max-w-md">
              <FormLabel>Pesan</FormLabel>
              <FormControl>
                <Input placeholder="Tulis pesan Anda..." {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialog open={open} onOpenChange={setOpen}>
          <Button type="submit" className="w-full max-w-md" disabled={submit}>
            {submit ? "Mengirim..." : "Kirim Pesan"}
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Pengiriman</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin mengirim pesan ini?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)} disabled={submit}>
                Batal
              </AlertDialogCancel>
              <Button
                onClick={() => handleSubmit(finalFormData.current)}
                disabled={submit}
              >
                {submit ? "Mengirim..." : "Ya, Kirim"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  )
}
