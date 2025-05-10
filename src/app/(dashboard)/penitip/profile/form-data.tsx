"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/user-context";
import { getNikPenitip } from "@/services/penitip/penitip-services";
import { getUser } from "@/services/auth/user-services";
import { User } from "@/services/utils";

const profileSchema = z.object({
    nama: z
        .string()
        .trim()
        .nonempty({ message: "Nama tidak boleh kosong" })
        .min(4, { message: "Nama minimal 4 karakter" }),
    email: z
        .string()
        .trim()
        .nonempty({ message: "Email tidak boleh kosong" })
        .email({ message: "Format email tidak valid" }),
    no_telp: z
        .string()
        .trim()
        .nonempty({ message: "Nomor telepon tidak boleh kosong" })
        .min(10, { message: "Nomor telepon tidak valid" })
        .max(14, { message: "Nomor telepon tidak valid" })
        .startsWith("0", { message: "Format Nomor telepon tidak valid" }),
    nik: z
        .string()
        .trim()
        .nonempty({ message: "NIK tidak boleh kosong" }),
});

type ProfileFormType = z.infer<typeof profileSchema>;

export default function Form_Profile({user}: { user: User }) {
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<ProfileFormType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            nama: user.nama,
            email: user.email,
            no_telp: user.no_telp,
            nik: user.penitip?.nik || "",
        },
    });

    const handleSubmitProfile = () => {
        setOpen(true);
    };

    const handleConfirmSubmit = async () => {
        const values = form.getValues();
        const formData = new FormData();
        formData.append("nama", values.nama);
        formData.append("email", values.email);
        formData.append("no_telp", values.no_telp);

        setSubmitting(true);
        try {
            await fetch("/api/update-profile", { // belum bikin backend (nanti aja minggu 1 blm perlu)
                method: "POST",
                body: formData,
            });
            toast.success("Profil berhasil diperbarui!");
            setOpen(false);
        } catch (err) {
            toast.error("Terjadi kesalahan saat memperbarui profil");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmitProfile)}
                className="flex flex-col gap-5 p-6"
            >
                <h2 className="text-xl font-bold">Edit Profil</h2>

                <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama.</FormLabel>
                            <FormControl>
                                <Input placeholder="Nama lengkap" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="no_telp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nomor Telepon</FormLabel>
                            <FormControl>
                                <Input placeholder="08XXXXXXXXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="nik"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NIK</FormLabel>
                            <FormControl>
                                <Input placeholder="NIK" {...field} disabled className="cursor-not-allowed bg-muted" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    variant="default"
                    disabled={submitting}
                >
                    {submitting ? "Memproses..." : "Simpan Perubahan"}
                </Button>
            </form>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Perubahan</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menyimpan perubahan ini?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={submitting}>Batal</AlertDialogCancel>
                        <Button onClick={handleConfirmSubmit} disabled={submitting}>
                            {submitting ? "Memproses..." : "Ya, Simpan"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Form>
    );
}