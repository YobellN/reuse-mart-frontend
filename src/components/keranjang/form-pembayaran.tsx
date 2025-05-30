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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import React from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "../ui/alert-dialog"
import { toast } from "sonner"
import { PembayaranFormSchema, PembayaranSchema } from "@/services/pembayaran/schema-pembayaran"
import { handleNewPembayaran } from "@/services/pembayaran/pembayaran-services"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type NewPembayaranFormProps = {
    id_penjualan: string;
    totalAkhir: number;
};

export default function NewPembayaranForm({ id_penjualan, totalAkhir }: NewPembayaranFormProps) {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const form = useForm<PembayaranFormSchema>({
        resolver: zodResolver(PembayaranSchema),
        defaultValues: {
            id_penjualan: id_penjualan,
            metode_pembayaran: "BCA",
        },
    });
    const finalFormData = React.useRef(new FormData());

    async function onSubmit(values: PembayaranFormSchema) {
        const isValid = await form.trigger();

        if (isValid) {
            const formData = new FormData();
            formData.append("id_penjualan", id_penjualan);
            formData.append("metode_pembayaran", values.metode_pembayaran);
            formData.append("bukti_pembayaran", values.bukti_pembayaran);
            console.log("values:", values);
            console.log("FormData yang dikirim:");
            for (const [key, val] of formData.entries()) {
                console.log(`${key}:`, val instanceof File ? val.name : val);
            }
            finalFormData.current = formData;
            console.log("FormData final yang dikirim:");
            for (const [key, val] of finalFormData.current.entries()) {
                console.log(`${key}:`, val instanceof File ? val.name : val);
            }

            setOpen(true);
        } else {
            alert("Form belum valid");
        }
    }

    async function handleSubmit(data: FormData) {
        setSubmit(true);

        try {
            console.log("FormData final 23 yang dikirim:");
            for (const [key, val] of data.entries()) {
                console.log(`${key}:`, val instanceof File ? val.name : val);
            }
            const res = await handleNewPembayaran(data);
            if (res.message === "Pembayaran berhasil dibuat") {
                router.push("/home");
                toast.success("Pembayaran berhasil dilakukan");
                form.reset();
                setOpen(false);
            } else {
                if (res.errors) {
                    Object.entries(res.errors).forEach(([field, message]) => {
                        form.setError(field as keyof PembayaranFormSchema, {
                            type: "server",
                            message: Array.isArray(message) ? message[0] : String(message),
                        });
                    });
                }
                setSubmit(false);
                toast.error("Gagal menambahkan pembayaran");
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
                <CardTitle className="text-2xl text-center">Tagihan : {totalAkhir}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="metode_pembayaran"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Metode Pembayaran:</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="BCA" />
                                                </FormControl>
                                                <FormLabel className="font-normal">BCA</FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="BNI" />
                                                </FormControl>
                                                <FormLabel className="font-normal">BNI</FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="Mandiri" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Mandiri</FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="BRI" />
                                                </FormControl>
                                                <FormLabel className="font-normal">BRI</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bukti_pembayaran"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>File</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => form.setValue("bukti_pembayaran", e.target.files?.[0] as File)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <div className="pt-4">
                            <AlertDialog open={open} onOpenChange={setOpen}>
                                <Button type="submit" className="w-full" disabled={submit}>Bayar</Button>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Pembayaran</AlertDialogTitle>
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
                                            {submit ? "Memproses..." : "Ya, Bayar"}
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
