'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import React from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "../../ui/alert-dialog"
import { toast } from "sonner"
import { AlamatFormSchema, AlamatSchema } from "@/services/alamat/schema-alamat"
import { handleNewAlamat } from "@/services/alamat/alamat-services"
import { Textarea } from "../../ui/textarea"


export default function NewAlamatForm() {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const form = useForm<AlamatFormSchema>({
        resolver: zodResolver(AlamatSchema),
        defaultValues: {
            label: "",
            kabupaten_kota: "",
            kecamatan: "",
            kode_pos: "",
            detail_alamat: "",
        },
    });
    const finalFormData = React.useRef(new FormData());

    async function onSubmit(values: AlamatFormSchema) {
        console.log("value1231313");
        const isValid = await form.trigger();
        console.log("isValid", isValid);
        if (isValid) {
            const formData = new FormData();
            formData.append("label", values.label);
            formData.append("kabupaten_kota", values.kabupaten_kota);
            formData.append("kecamatan", values.kecamatan);
            formData.append("kode_pos", values.kode_pos);
            formData.append("detail_alamat", values.detail_alamat);
            finalFormData.current = formData;
            setOpen(true);
        } else {
            alert("Form belum valid");
        }
    }

    async function handleSubmit(data: FormData) {
        setSubmit(true);

        try {
            console.log("Data yang dikirim:", data);
            const res = await handleNewAlamat(data);

            if (res.message === "Alamat berhasil ditambahkan") {
                router.back();
                toast.success("Alamat berhasil ditambahkan");
                form.reset();
                setOpen(false);
            } else {
                if (res.errors) {
                    Object.entries(res.errors).forEach(([field, message]) => {
                        form.setError(field as keyof AlamatFormSchema, {
                            type: "server",
                            message: Array.isArray(message) ? message[0] : String(message),
                        });
                    });
                }
                setSubmit(false);
                toast.error("Gagal menambahkan alamat");
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
                <CardTitle className="text-2xl text-center">Formulir Alamat</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label Alamat</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Contoh: Rumah, Kantor, Apartemen"
                                            className="min-h-[50px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="kabupaten_kota"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kabupaten/Kota</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Contoh: Jakarta Selatan"
                                            className="min-h-[50px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="kecamatan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kecamatan</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Contoh: Kebayoran Baru"
                                            className="min-h-[50px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="kode_pos"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kode Pos</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Contoh: 12120"
                                            className="min-h-[50px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="detail_alamat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Detail Alamat</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Contoh: Jl. Sudirman No. 10, RT 01 RW 02"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4">
                            <AlertDialog open={open} onOpenChange={setOpen}>
                                <Button type="submit" className="w-full" disabled={submit}>{submit ? "Memproses..." : "Kirim Alamat"}</Button>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Alamat</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah data alamat Anda sudah benar?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setOpen(false)} disabled={submit}>Batal</AlertDialogCancel>
                                        <Button
                                            type="button"
                                            onClick={() => handleSubmit(finalFormData.current)}
                                            disabled={submit}
                                        >
                                            {submit ? "Memproses..." : "Ya, Saya yakin"}
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
