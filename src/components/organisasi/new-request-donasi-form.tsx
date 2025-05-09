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
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "../ui/alert-dialog"
import { toast } from "sonner"
import { RequestDonasiFormSchema, RequestDonasiSchema } from "@/services/organisasi/schema-organisasi"
import { handleNewRequestDonasi } from "@/services/organisasi/organisasi-services"
import { Textarea } from "../ui/textarea"


export default function NewRequestDonasiForm() {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const form = useForm<RequestDonasiFormSchema>({
        resolver: zodResolver(RequestDonasiSchema),
        defaultValues: {
            deskripsi_request: ""
        },
    });
    const finalFormData = React.useRef(new FormData());

    async function onSubmit(values: RequestDonasiFormSchema) {
        const isValid = await form.trigger();

        if (isValid) {
            const formData = new FormData();
            formData.append("deskripsi_request", values.deskripsi_request);
            finalFormData.current = formData;
            setOpen(true);
        } else {
            alert("Form belum valid");
        }
    }

    async function handleSubmit(data: FormData) {
        setSubmit(true);

        try {
            const res = await handleNewRequestDonasi(data);

            if (res.message === "Request donasi berhasil ditambahkan") {
                router.push("/organisasi/request-donasi");
                toast.success("Request donasi berhasil ditambahkan");
                form.reset();
                setOpen(false);
            } else {
                if (res.errors) {
                    Object.entries(res.errors).forEach(([field, message]) => {
                        form.setError(field as keyof RequestDonasiFormSchema, {
                            type: "server",
                            message: Array.isArray(message) ? message[0] : String(message),
                        });
                    });
                }
                setSubmit(false);
                toast.error("Gagal menambahkan request donasi");
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
                <CardTitle className="text-2xl text-center">Formulir Request Donasi</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="deskripsi_request"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi Request</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Contoh: Kulkas untuk menyimpan ASI dan makanan bayi"
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
                                <Button type="submit" className="w-full" disabled={submit}>{submit ? "Memproses..." : "Kirim Request"}</Button>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Request</AlertDialogTitle>
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
        </Card >
    )
}
