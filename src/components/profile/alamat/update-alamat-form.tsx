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
} from  "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import React from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "../../ui/alert-dialog"
import { toast } from "sonner"
import { Alamat, AlamatFormSchema, AlamatSchema } from "@/services/alamat/schema-alamat"
import { handleUpdateAlamat } from "@/services/alamat/alamat-services"
import { Textarea } from "../../ui/textarea"
import { Input } from "@/components/ui/input"

export default function UpdateAlamatForm({alamat}: {alamat: Alamat }) {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const form = useForm<AlamatFormSchema>({
        resolver: zodResolver(AlamatSchema),
        defaultValues: {
            label: alamat.label || "",
            kabupaten_kota: alamat.kabupaten_kota || "",
            kecamatan: alamat.kecamatan || "",
            kode_pos: alamat.kode_pos || "",
            detail_alamat: alamat.detail_alamat || "",
        },
    });
    const finalFormData = React.useRef(new FormData());

    async function onSubmit(values: AlamatFormSchema) {
        const isValid = await form.trigger();

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
            const res = await handleUpdateAlamat(data, alamat.id_alamat);

            if (res.message === "Alamat berhasil diperbarui") {
                router.push("/profile/alamat");
                // router.back();
                toast.success("Alamat berhasil diperbarui");
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
                toast.error("Gagal mengubah alamat");
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
                <CardTitle className="text-2xl text-center">Edit Alamat</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Rumah, Kantor" {...field} />
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
                                        <Input placeholder="Contoh: Jakarta Selatan" {...field} />
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
                                        <Input placeholder="Contoh: Kebayoran Baru" {...field} />
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
                                        <Input placeholder="Contoh: 12120" {...field} />
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
                                            placeholder="Contoh: Jl. Sudirman No. 123, RT 01 RW 02"
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
                                <Button type="submit" className="w-full" disabled={submit}>{submit ? "Memproses..." : "Edit Alamat"}</Button>
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
                                            {submit ? "Memproses..." : "Ya, Saya yakin"}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
