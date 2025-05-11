'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import React from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { toast } from "sonner"
import { Organisasi, OrganisasiFormSchema, OrganisasiSchema } from "@/services/organisasi/schema-organisasi"
import { z } from "zod"
import { handleUpdateOrganisasi } from "@/services/organisasi/organisasi-services"

const UpdateOrganisasiSchema = OrganisasiSchema.partial({
    password: true
});

type UpdateOrganisasiFormSchema = z.infer<typeof UpdateOrganisasiSchema>;

export default function UpdateOrganisasiForm({ Organisasi }: { Organisasi: Organisasi }) {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const form = useForm<UpdateOrganisasiFormSchema>({
        resolver: zodResolver(UpdateOrganisasiSchema),
        defaultValues: {
            nama: Organisasi.user.nama,
            email: Organisasi.user.email,
            no_telp: Organisasi.user.no_telp,
            no_sk: Organisasi.no_sk,
            jenis_organisasi: Organisasi.jenis_organisasi,
            alamat_organisasi: Organisasi.alamat_organisasi,
        },
    });
    const finalFormData = React.useRef(new FormData());

    async function onSubmit(values: UpdateOrganisasiFormSchema) {
        const isValid = await form.trigger();

        if (isValid) {
            const formData = new FormData();
            formData.append("nama", values.nama);
            formData.append("email", values.email);
            formData.append("no_telp", values.no_telp);
            formData.append("no_sk", values.no_sk);
            formData.append("jenis_organisasi", values.jenis_organisasi);
            formData.append("alamat_organisasi", values.alamat_organisasi);
            finalFormData.current = formData;
            setOpen(true);
        } else {
            alert("Form belum valid");
        }
    }

    async function handleSubmit(data: FormData) {
        setSubmit(true);

        try {
            const res = await handleUpdateOrganisasi(data, Organisasi.id_organisasi);

            if (res.message === "Organisasi berhasil diperbarui") {
                router.push("/admin/organisasi");
                toast.success("Organisasi berhasil diperbarui");
                setOpen(false);
            } else {
                if (res.errors) {
                    Object.entries(res.errors).forEach(([field, message]) => {
                        form.setError(field as keyof OrganisasiFormSchema, {
                            type: "server",
                            message: Array.isArray(message) ? message[0] : String(message),
                        });
                    });
                }
                setSubmit(false);
                toast.error("Gagal memperbarui Organisasi");
            }
        } catch (err) {
            setSubmit(false);
            toast.error("Terjadi kesalahan server");
        } finally {
            setOpen(false);
        }
    }

    return (
        <Card className="max-w-2xl mx-auto mt-10 shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Formulir Edit Data Organisasi</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="nama"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Lengkap</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Adi Nugroho" {...field} />
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
                                        <Input type="email" placeholder="Contoh: adi@email.com" {...field} />
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
                                        <Input placeholder="Contoh: 081234567890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="no_sk"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nomor SK</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan nomor SK" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="jenis_organisasi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jenis Organisasi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan jenis organisasi" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="alamat_organisasi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat Organisasi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan alamat organisasi" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4">
                            <AlertDialog open={open} onOpenChange={setOpen}>
                                <Button type="submit" className="w-full" disabled={submit}>Perbarui</Button>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Perubahan</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah data Anda sudah benar?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setOpen(false)} disabled={submit}>Batal</AlertDialogCancel>
                                        <Button
                                            type="button"
                                            onClick={() => handleSubmit(finalFormData.current)}
                                            disabled={submit}
                                        >
                                            {submit ? "Memproses..." : "Ya, Perbarui"}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card >
    )
}
