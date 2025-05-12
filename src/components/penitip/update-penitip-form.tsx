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
import { Penitip, PenitipFormSchema, PenitipSchema } from "@/services/penitip/schema-penitip"
import { z } from "zod"
import handleUpdatePenitip from "@/services/penitip/penitip-services"

const UpdatePenitipSchema = PenitipSchema.partial({
    password: true,
    foto_ktp: true
});

type UpdatePenitipFormSchema = z.infer<typeof UpdatePenitipSchema>;

export default function UpdatePenitipForm({ penitip }: { penitip: Penitip }) {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const form = useForm<UpdatePenitipFormSchema>({
        resolver: zodResolver(UpdatePenitipSchema),
        defaultValues: {
            nama: penitip.user.nama,
            email: penitip.user.email,
            no_telp: penitip.user.no_telp,
            nik: penitip.nik,
            poin: penitip.poin,
            saldo: penitip.saldo
        },
    });
    const finalFormData = React.useRef(new FormData());

    async function onSubmit(values: UpdatePenitipFormSchema) {
        const isValid = await form.trigger();

        if (isValid) {
            const formData = new FormData();
            formData.append("nama", values.nama);
            formData.append("email", values.email);
            formData.append("no_telp", values.no_telp);
            formData.append("poin", (values.poin ?? 0).toString());
            formData.append("saldo", (values.saldo ?? 0).toString());
            formData.append("nik", values.nik);
            if (values.foto_ktp) {
                formData.append("foto_ktp", values.foto_ktp);
            }

            finalFormData.current = formData;
            setOpen(true);
        } else {
            alert("Form belum valid");
        }
    }

    async function handleSubmit(data: FormData) {
        setSubmit(true);

        try {
            const res = await handleUpdatePenitip(data, penitip.id_penitip);

            if (res.message === "Penitip berhasil diperbarui") {
                router.push("/cs/penitip");
                toast.success("Penitip berhasil diperbarui");
                setOpen(false);
            } else {
                if (res.errors) {
                    Object.entries(res.errors).forEach(([field, message]) => {
                        form.setError(field as keyof PenitipFormSchema, {
                            type: "server",
                            message: Array.isArray(message) ? message[0] : String(message),
                        });
                    });
                }
                setSubmit(false);
                toast.error("Gagal memperbarui penitip");
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
                <CardTitle className="text-2xl text-center">Formulir Edit Data Penitip</CardTitle>
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
                            name="poin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Poin</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="saldo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Saldo</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="" {...field} />
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
                                        <Input placeholder="16 digit NIK" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="foto_ktp"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>File</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => form.setValue("foto_ktp", e.target.files?.[0] as File)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
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
