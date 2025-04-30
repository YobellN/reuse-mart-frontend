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
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "../ui/alert-dialog"
import { toast } from "sonner"
import { PenitipFormSchema, PenitipSchema } from "@/services/penitip/schema-penitip"
import { handleNewPenitip } from "@/services/penitip/penitip-services"


export default function NewPenitipForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const form = useForm<PenitipFormSchema>({
        resolver: zodResolver(PenitipSchema),
        defaultValues: {
            nama: "",
            email: "",
            no_telp: "",
            password: "",
            nik: "",
        },
    });
    const finalFormData = React.useRef(new FormData());

    async function onSubmit(values: PenitipFormSchema) {
        const isValid = await form.trigger();

        if (isValid) {
            const formData = new FormData();
            formData.append("nama", values.nama);
            formData.append("email", values.email);
            formData.append("no_telp", values.no_telp);
            formData.append("password", values.password);
            formData.append("nik", values.nik);
            formData.append("foto_ktp", values.foto_ktp);

            finalFormData.current = formData;
            setOpen(true);
        } else {
            alert("Form belum valid");
        }
    }

    async function handleSubmit(data: FormData) {
        setSubmit(true);

        try {
            const res = await handleNewPenitip(data);

            if (res.message === "Penitip berhasil ditambahkan") {
                router.push("/cs/penitip");
                toast.success("Penitip berhasil ditambahkan");
                form.reset();
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
                toast.error("Gagal menambahkan penitip" );
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
                <CardTitle className="text-2xl text-center">Formulir Pendaftaran Penitip</CardTitle>
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input type={showPassword ? "text" : "password"} placeholder="********" {...field} />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword((prev) => !prev)}>
                                                {showPassword ? (
                                                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                                                ) : (
                                                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                                                )}
                                            </Button>
                                        </div>
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
                                <Button type="submit" className="w-full" disabled={submit}>Daftar</Button>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Pendaftaran</AlertDialogTitle>
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
                                            {submit ? "Memproses..." : "Ya, Daftarkan"}
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
